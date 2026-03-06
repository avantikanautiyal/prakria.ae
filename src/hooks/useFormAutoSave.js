import { useEffect, useRef } from 'react';

/**
 * Custom hook to auto-save form state to localStorage and restore it on mount.
 * @param {Object} options
 * @param {string} options.key - Unique key for localStorage (e.g., 'sub-service-new', 'service-edit-123')
 * @param {Object} options.watchValues - The values watched by react-hook-form (result of watch())
 * @param {Function} options.reset - The reset function from react-hook-form to restore data
 * @param {boolean} options.enabled - Whether the auto-save should be active (e.g., disable when loading initial data)
 */
export function useFormAutoSave({ key, watchValues, reset, enabled = true }) {
  const isRestored = useRef(false);

  // Restore on mount
  useEffect(() => {
    if (!enabled || isRestored.current) return;

    const savedData = localStorage.getItem(`prakria-admin-${key}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // We set values from local storage
        reset(parsed);
        isRestored.current = true;
      } catch (e) {
        console.error('Failed to restore form state:', e);
      }
    }
  }, [enabled, key, reset]);

  // Save on change (debounced)
  useEffect(() => {
    if (!enabled) return;

    const timeoutId = setTimeout(() => {
      // Don't save if everything is empty/default-like (optional heuristic)
      if (watchValues && Object.keys(watchValues).length > 0) {
        localStorage.setItem(`prakria-admin-${key}`, JSON.stringify(watchValues));
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [watchValues, key, enabled]);

  // Function to clear storage on success
  const clearStorage = () => {
    localStorage.removeItem(`prakria-admin-${key}`);
  };

  return { clearStorage };
}

/**
 * Hook to add a beforeunload listener to warn about unsaved changes.
 * @param {boolean} isDirty - Result of formState.isDirty from react-hook-form
 */
export function useNavigationGuard(isDirty) {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
}
