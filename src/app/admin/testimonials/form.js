'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { s3Upload } from '@/utils/s3Upload';
import { useFormAutoSave, useNavigationGuard } from '@/hooks/useFormAutoSave';


export default function TestimonialForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!params.id;

  const { register, control, handleSubmit, setValue, watch, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      name: '',
      position: '',
      message: '',
      image: '',
      video: '',
      rating: 5,
    }
  });

  const formData = useWatch({ control });
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
    refetchOnWindowFocus: false,
    enabled: isEdit,
  });

  const { clearStorage } = useFormAutoSave({
    key: `testimonial-${params.id || 'new'}`,
    watchValues: formData,
    reset,
    enabled: !isLoadingTestimonial
  });

  useNavigationGuard(isDirty);

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
      clearStorage();
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

      // Auto-detect and set correct field if it's the main media
      if (path === 'image' || path === 'video') {
        const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm') || file.name.endsWith('.mov');
        if (isVideo) {
          setValue('video', url);
          setValue('image', ''); // Clear image if it's a video
        } else {
          setValue('image', url);
          setValue('video', ''); // Clear video if it's an image
        }
      }

      toast.success('Media uploaded successfully');
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
            <label className="block text-zinc-400 mb-2">Media (Image/GIF/Video)</label>
            <div className="space-y-2">
              <input
                type="file"
                className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                onChange={(e) => handleUpload(e.target.files[0], 'image')}
              />
              {uploading.image || uploading.video ? <p className="text-sm text-yellow-500">Uploading...</p> : null}
              {formData.video ? (
                <div className="relative border border-zinc-800 rounded overflow-hidden">
                  <video src={formData.video} className="h-40 w-full object-cover" autoPlay muted loop playsInline />
                  <button type="button" onClick={() => setValue('video', '')} className="absolute top-1 right-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                </div>
              ) : formData.image ? (
                <div className="relative border border-zinc-800 rounded overflow-hidden">
                  <img src={formData.image} alt="Preview" className="h-40 w-full object-cover" />
                  <button type="button" onClick={() => setValue('image', '')} className="absolute top-1 right-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                </div>
              ) : null}
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
