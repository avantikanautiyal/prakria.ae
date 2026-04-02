'use client';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const changePasswordMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to change password');
      }
      return result;
    },
    onSuccess: () => {
      toast.success('Password changed successfully!');
      reset();
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  const onSubmit = (data) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-2">Change Password</h1>
      <p className="text-zinc-400 mb-8">
        Update your admin password. Make sure to use a strong password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Current Password */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
              className={`w-full p-3 bg-zinc-800 border ${
                errors.currentPassword ? 'border-red-500' : 'border-zinc-700'
              } rounded-lg text-white focus:outline-none focus:border-zinc-500 pr-12`}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              {showCurrentPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={`w-full p-3 bg-zinc-800 border ${
                errors.newPassword ? 'border-red-500' : 'border-zinc-700'
              } rounded-lg text-white focus:outline-none focus:border-zinc-500 pr-12`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              {showNewPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value) =>
                  value === newPassword || 'Passwords do not match',
              })}
              className={`w-full p-3 bg-zinc-800 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-zinc-700'
              } rounded-lg text-white focus:outline-none focus:border-zinc-500 pr-12`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="w-full bg-white text-black p-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-2"
        >
          {changePasswordMutation.isPending
            ? 'Changing Password...'
            : 'Change Password'}
        </button>
      </form>
    </div>
  );
}
