'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { useForm, useWatch } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { s3Upload } from '@/utils/s3Upload';
import { useFormAutoSave, useNavigationGuard } from '@/hooks/useFormAutoSave';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function BlogForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const editor = useRef(null);
  const isEdit = !!params.id;

  const { register, control, handleSubmit, setValue, watch, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      title: '',
      content: '',
      author: '',
      image: '',
      category: '',
      slug: '',
      video: '',
    }
  });


  const formData = useWatch({ control });
  const [uploading, setUploading] = useState({ image: false });

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing...',
    height: 400,
  }), []);

  // Fetch Blog Data
  const { data, isLoading: isLoadingBlog } = useQuery({
    queryKey: ['blog', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${params.id}`);
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch blog');
      return data.data;
    },
    refetchOnWindowFocus: false,
    enabled: isEdit,
  });

  // Initialize form with fetched data
  useEffect(() => {
    if (data && !isDirty) {
      reset(data);
    }
  }, [data, reset, isDirty]);

  const { clearStorage } = useFormAutoSave({
    key: `blog-${params.id || 'new'}`,
    watchValues: formData,
    reset,
    enabled: !isLoadingBlog
  });

  useNavigationGuard(isDirty);

  // Mutation for Create/Update
  const blogMutation = useMutation({
    mutationFn: async (data) => {
      const url = isEdit ? `/api/blogs/${params.id}` : '/api/blogs';
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
      toast.success(`Blog ${isEdit ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries(['blogs']);
      router.push('/admin/blogs');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const url = await s3Upload(file);
      setValue(type, url);

      // Auto-detect and set correct field for main media
      if (type === 'image' || type === 'video') {
        const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm') || file.name.endsWith('.mov');
        if (isVideo) {
          setValue('video', url);
          setValue('image', '');
        } else {
          setValue('image', url);
          setValue('video', '');
        }
      }

      toast.success('Media uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload file: ' + error.message);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const onSubmit = (data) => {
    blogMutation.mutate(data);
  };

  if (isEdit && isLoadingBlog) {
    return <div className="text-white">Loading blog data...</div>;
  }

  return (
    <div className="max-w-4xl pb-20">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Blog' : 'Add New Blog'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-zinc-400 mb-2">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full p-2 bg-zinc-900 border ${errors.title ? 'border-red-500' : 'border-zinc-800'} rounded text-white`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-zinc-400 mb-2">Author</label>
            <input
              type="text"
              {...register('author', { required: 'Author is required' })}
              className={`w-full p-2 bg-zinc-900 border ${errors.author ? 'border-red-500' : 'border-zinc-800'} rounded text-white`}
            />
            {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>}
          </div>
          <div>
            <label className="block text-zinc-400 mb-2">Slug</label>
            <input
              type="text"
              {...register('slug', { required: 'Slug is required' })}
              className={`w-full p-2 bg-zinc-900 border ${errors.slug ? 'border-red-500' : 'border-zinc-800'} rounded text-white`}
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-zinc-400 mb-2">Category</label>
            <input
              type="text"
              {...register('category')}
              className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-2">Media (Image/GIF/Video)</label>
            <div className="space-y-2">
              <input
                type="file"
                className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                onChange={(e) => handleFileUpload(e, 'image')}
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
          <label className="block text-zinc-400 mb-2">Content</label>
          <div className="bg-white text-black p-0.5 rounded overflow-hidden">
            <JoditEditor
              ref={editor}
              value={formData.content}
              config={config}
              onBlur={(newContent) => setValue('content', newContent)}
            />
          </div>
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={blogMutation.isPending || uploading.image}
            className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {blogMutation.isPending ? 'Saving...' : (isEdit ? 'Update Blog' : 'Create Blog')}
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
