'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { s3Upload } from '@/utils/s3Upload';


export default function TestimonialForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!params.id;

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      position: '',
      message: '',
      image: '',
      rating: 5,
    }
  });

  const formData = watch();
  const [uploading, setUploading] = useState({ image: false });

  // Fetch Testimonial Data
  const { isLoading: isLoadingTestimonial } = useQuery({
    queryKey: ['testimonial', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials/${params.id}`);
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch testimonial');
      reset(data.data);
      return data.data;
    },
    enabled: isEdit,
  });

  // Mutation for Create/Update
  const testimonialMutation = useMutation({
    mutationFn: async (data) => {
      const url = isEdit ? `/api/testimonials/${params.id}` : '/api/testimonials';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || 'Something went wrong');
      return result;
    },
    onSuccess: () => {
      toast.success(`Testimonial ${isEdit ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries(['testimonials']);
      router.push('/admin/testimonials');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpload = async (file, path) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [path]: true }));

    try {
      const url = await s3Upload(file);
      setValue(path, url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [path]: false }));
    }
  };

  const onSubmit = (data) => {
    testimonialMutation.mutate(data);
  };

  if (isEdit && isLoadingTestimonial) {
    return <div className="text-white">Loading testimonial data...</div>;
  }

  return (
    <div className="max-w-4xl pb-20">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Testimonial' : 'Add New Testimonial'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-zinc-400 mb-2">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`w-full p-2 bg-zinc-900 border ${errors.name ? 'border-red-500' : 'border-zinc-800'} rounded text-white`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-zinc-400 mb-2">Position</label>
            <input
              type="text"
              {...register('position')}
              className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-zinc-400 mb-2">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              {...register('rating', { valueAsNumber: true })}
              className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-2">Image</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                onChange={(e) => handleUpload(e.target.files[0], 'image')}
              />
              {uploading.image && <p className="text-sm text-yellow-500">Uploading...</p>}
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-20 w-32 object-cover rounded border border-zinc-800" />
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-zinc-400 mb-2">Message</label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            className={`w-full p-2 bg-zinc-900 border ${errors.message ? 'border-red-500' : 'border-zinc-800'} rounded text-white h-48`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={testimonialMutation.isPending || uploading.image}
            className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {testimonialMutation.isPending ? 'Saving...' : (isEdit ? 'Update Testimonial' : 'Create Testimonial')}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-zinc-800 text-white px-6 py-2 rounded font-bold hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
