'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { s3Upload } from '@/utils/s3Upload';

export default function HomePageSectionForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!params.id;

  const { register, control, handleSubmit, setValue, reset, formState: { isDirty } } = useForm({
    defaultValues: {
      title: '',
      ctaText: 'View all',
      ctaHoverText: 'View all',
      ctaLink: '',
      order: 0,
      isActive: true,
      items: [
        {
          title: '',
          description: '',
          mediaType: 'image',
          src: '',
          alt: '',
          link: '',
        },
      ],
    },
  });

  const formData = useWatch({ control });
  const [uploading, setUploading] = useState({});

  const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
    control,
    name: 'items',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['homepage-section', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/homepage/sections/${params.id}`);
      const result = await res.json();
      if (!result.success) throw new Error('Failed to fetch section');
      return result.data;
    },
    enabled: isEdit,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !isDirty) {
      reset(data);
    }
  }, [data, reset, isDirty]);

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      const url = isEdit ? `/api/homepage/sections/${params.id}` : '/api/homepage/sections';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || 'Failed to save section');
      return result.data;
    },
    onSuccess: () => {
      toast.success('Homepage section saved');
      queryClient.invalidateQueries(['homepage-sections']);
      router.push('/admin/homepage');
    },
    onError: (err) => toast.error(err.message),
  });

  const handleUpload = async (file, path) => {
    if (!file) return;
    setUploading((prev) => ({ ...prev, [path]: true }));
    try {
      const url = await s3Upload(file);
      setValue(path, url);
      toast.success('File uploaded');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading((prev) => ({ ...prev, [path]: false }));
    }
  };

  if (isEdit && isLoading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-5xl pb-20 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Homepage Section' : 'New Homepage Section'}</h1>

      <form onSubmit={handleSubmit((payload) => saveMutation.mutate(payload))} className="space-y-12">
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Section Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title</label>
              <input {...register('title', { required: true })} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" />
            </div>
            <div>
              <label className="label">Order</label>
              <input type="number" {...register('order', { valueAsNumber: true })} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">CTA Text</label>
              <input {...register('ctaText')} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" />
            </div>
            <div>
              <label className="label">CTA Hover Text</label>
              <input {...register('ctaHoverText')} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" />
            </div>
          </div>

          <div>
            <label className="label">CTA Link</label>
            <input {...register('ctaLink')} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" placeholder="/digital-marketing" />
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" {...register('isActive')} />
            Active
          </label>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">Section Items</h2>
            <button
              type="button"
              onClick={() =>
                appendItem({
                  title: '',
                  description: '',
                  mediaType: 'image',
                  src: '',
                  alt: '',
                  link: '',
                })
              }
              className="btn-sm"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-6">
            {itemFields.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative space-y-3">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label text-xs">Title</label>
                    <input {...register(`items.${index}.title`)} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" />
                  </div>
                  <div>
                    <label className="label text-xs">Media Type</label>
                    <select {...register(`items.${index}.mediaType`)} className="input w-full bg-zinc-800 text-white">
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="gif">GIF</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label text-xs">Description</label>
                  <textarea {...register(`items.${index}.description`)} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" rows="2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label text-xs">File</label>
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e.target.files?.[0], `items.${index}.src`)}
                      className="input w-full text-xs bg-zinc-800 text-white placeholder:text-zinc-400"
                    />
                    {uploading[`items.${index}.src`] && (
                      <p className="text-xs text-zinc-400 mt-1">Uploading...</p>
                    )}
                    {formData?.items?.[index]?.src && (
                      <div className="mt-2 h-20 rounded border border-zinc-800 overflow-hidden bg-black">
                        {formData.items[index].mediaType === 'video' ? (
                          <video
                            src={formData.items[index].src}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            src={formData.items[index].src}
                            className="w-full h-full object-cover"
                            alt="Preview"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="label text-xs">Alt Text</label>
                    <input {...register(`items.${index}.alt`)} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" />
                  </div>
                </div>

                <div>
                  <label className="label text-xs">Item Link</label>
                  <input {...register(`items.${index}.link`)} className="input w-full bg-zinc-800 text-white placeholder:text-zinc-400" placeholder="/case-study/slug" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="bg-white text-black px-6 py-3 rounded font-bold hover:bg-zinc-200 transition-colors"
        >
          {saveMutation.isPending ? 'Saving...' : isEdit ? 'Update Section' : 'Create Section'}
        </button>
      </form>
    </div>
  );
}
