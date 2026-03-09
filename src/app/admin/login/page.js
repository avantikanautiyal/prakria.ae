'use client';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Invalid email or password');
      }
      return data;
    },
    onSuccess: () => {
      // Store login state in sessionStorage
      sessionStorage.setItem('admin_logged_in', 'true');
      toast.success('Logged in successfully');
      window.location.href = '/admin';
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-8 bg-zinc-900 rounded-lg shadow-xl w-96 border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full p-2 bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} rounded text-white focus:outline-none focus:border-zinc-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-zinc-400 mb-2">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full p-2 bg-zinc-800 border ${errors.password ? 'border-red-500' : 'border-zinc-700'} rounded text-white focus:outline-none focus:border-zinc-500`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-white text-black p-2 rounded font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
