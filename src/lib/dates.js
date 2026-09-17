/**
 * Shared date helpers for admin + public surfaces.
 * Prefer postDate → createdAt → ObjectId timestamp. Never use updatedAt for public "published" dates.
 */

const OBJECT_ID_RE = /^[a-f\d]{24}$/i;
const LOCAL_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parse an HTML `YYYY-MM-DD` date input as a local calendar date (noon)
 * so UTC conversion does not shift the day.
 */
export function parseLocalDateInput(value) {
  if (value == null || value === '') return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const str = String(value).trim();
  const match = LOCAL_DATE_RE.exec(str);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    return new Date(year, month, day, 12, 0, 0, 0);
  }

  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Format a date for HTML `<input type="date">` as local `YYYY-MM-DD`.
 * Never use `toISOString().slice(0, 10)`.
 */
export function formatLocalDateInput(value) {
  if (value == null || value === '') return '';

  let date = value instanceof Date ? value : null;
  if (!date) {
    const asLocal = parseLocalDateInput(value);
    if (asLocal) date = asLocal;
    else {
      const fallback = new Date(value);
      if (!Number.isNaN(fallback.getTime())) date = fallback;
    }
  }

  if (!date || Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Resolve the public/admin display date for a content document. */
export function resolvePostDate(doc) {
  if (!doc) return null;

  if (doc.postDate) {
    const fromPost = new Date(doc.postDate);
    if (!Number.isNaN(fromPost.getTime())) return fromPost;
  }

  if (doc.createdAt) {
    const fromCreated = new Date(doc.createdAt);
    if (!Number.isNaN(fromCreated.getTime())) return fromCreated;
  }

  const id = doc._id != null ? String(doc._id) : '';
  if (OBJECT_ID_RE.test(id)) {
    const fromId = new Date(parseInt(id.substring(0, 8), 16) * 1000);
    if (!Number.isNaN(fromId.getTime())) return fromId;
  }

  return null;
}

/** Locale display date for public surfaces. Returns empty string if invalid. */
export function formatDisplayDate(value, options) {
  const date =
    value instanceof Date
      ? value
      : value
        ? parseLocalDateInput(value) || new Date(value)
        : null;

  if (!date || Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, options);
}

/**
 * Safe formatter for admin lists (inquiries, etc).
 * Never throws on missing/invalid dates.
 */
export function formatSafeDateTime(value, fallback = '—') {
  try {
    if (value == null || value === '') return fallback;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return fallback;
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return fallback;
  }
}

/** Safe long datetime for detail panes. */
export function formatSafeLongDateTime(value, fallback = '—') {
  try {
    if (value == null || value === '') return fallback;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return fallback;
    return date.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return fallback;
  }
}

/** Normalize blog create/update payloads before DB write. */
export function sanitizeBlogPayload(body = {}) {
  const next = { ...body };

  if (Object.prototype.hasOwnProperty.call(next, 'postDate')) {
    const parsed = parseLocalDateInput(next.postDate);
    if (parsed) {
      next.postDate = parsed;
    } else if (next.postDate === '' || next.postDate == null) {
      next.postDate = undefined;
      delete next.postDate;
    } else {
      delete next.postDate;
    }
  }

  return next;
}

/** Reject placeholder / purely numeric slugs from sitemaps and public URL emission. */
export function isValidPublicSlug(slug) {
  if (slug == null) return false;
  const normalized = String(slug).replace(/^\/+/, '').trim();
  if (!normalized) return false;
  if (/^\d+$/.test(normalized)) return false;
  return true;
}

export function normalizePublicSlug(slug) {
  if (slug == null) return '';
  return String(slug).replace(/^\/+/, '').trim();
}
