'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { s3Upload } from '@/utils/s3Upload';


export default function CaseStudyForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!params.id;

  const { register, control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      herosection: { title: '', conclusionLine: '', list: [{ src: '', alt: '', type: 'image' }] },
      storySection: { title: '', paragraphs: [''], conclusionLine: '' },
      challenge: { title: '', description: '', list: [{ text: '' }], conclusionLine: '' },
      startageySection: { title: '', description: '', list: [{ number: '', title: '', description: '' }], conclusionLine: '' },
      executionSection: { title: '', description: '', list: [{ src: '', alt: '', title: '', description: '' }], conclusionLine: '' },
      resultSection: { title: '', description: '', list: [{ text: '' }], conclusionLine: '' },
      whySection: { title: '', description: '', list: [{ src: '', alt: '', text: '' }], conclusionLine: '' },
    }
  });

  const { fields: heroList, append: appendHero, remove: removeHero } = useFieldArray({ control, name: 'herosection.list' });
  const { fields: storyList, append: appendStory, remove: removeStory } = useFieldArray({ control, name: 'storySection.paragraphs' });
  const { fields: challengeList, append: appendChallenge, remove: removeChallenge } = useFieldArray({ control, name: 'challenge.list' });
  const { fields: strategyList, append: appendStrategy, remove: removeStrategy } = useFieldArray({ control, name: 'startageySection.list' });
  const { fields: executionList, append: appendExecution, remove: removeExecution } = useFieldArray({ control, name: 'executionSection.list' });
  const { fields: resultList, append: appendResult, remove: removeResult } = useFieldArray({ control, name: 'resultSection.list' });
  const { fields: whyList, append: appendWhy, remove: removeWhy } = useFieldArray({ control, name: 'whySection.list' });

  const formData = watch();
  const [uploading, setUploading] = useState({});

  // Fetch Data
  const { isLoading } = useQuery({
    queryKey: ['case-study', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies/${params.id}`);
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch');
      reset(data.data);
      return data.data;
    },
    enabled: isEdit,
  });

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const url = isEdit ? `/api/case-studies/${params.id}` : '/api/case-studies';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || 'Failed to save');
      return result;
    },
    onSuccess: () => {
      toast.success('Case study saved successfully');
      queryClient.invalidateQueries(['case-studies']);
      router.push('/admin/case-studies');
    },
    onError: (err) => toast.error(err.message),
  });

  const handleUpload = async (file, path) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [path]: true }));

    try {
      const url = await s3Upload(file);
      setValue(path, url);
      toast.success('File uploaded');
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [path]: false }));
    }
  };

  if (isEdit && isLoading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-5xl pb-20 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Case Study' : 'New Case Study'}</h1>

      <form onSubmit={handleSubmit(data => saveMutation.mutate(data))} className="space-y-12">

        {/* Basic & SEO Info */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Basic & SEO Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input {...register('name', { required: true })} className="input w-full" />
            </div>
            <div>
              <label className="label">Slug</label>
              <input {...register('slug', { required: true })} className="input w-full" />
            </div>
          </div>
          <div>
            <label className="label">Meta Title</label>
            <input {...register('metaTitle')} className="input w-full" />
          </div>
          <div>
            <label className="label">Meta Description</label>
            <textarea {...register('metaDescription')} className="input w-full" rows="2" />
          </div>
          <div>
            <label className="label">Meta Keywords</label>
            <input {...register('metaKeywords')} className="input w-full" placeholder="comma separated" />
          </div>
        </section>

        {/* 1. herosection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">1. Hero Section</h2>
            <button type="button" onClick={() => appendHero({ src: '', alt: '', type: 'image' })} className="btn-sm">+ Add Item</button>
          </div>
          <div>
            <label className="label">Main Title</label>
            <input {...register('herosection.title')} className="input w-full" />
          </div>
          <div className="space-y-4 mt-4">
            {heroList.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative grid grid-cols-12 gap-4">
                <button type="button" onClick={() => removeHero(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                <div className="col-span-3">
                  <label className="label text-xs">Type</label>
                  <select {...register(`herosection.list.${index}.type`)} className="input w-full">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="gif">GIF</option>
                  </select>
                </div>
                <div className="col-span-4">
                  <label className="label text-xs">File</label>
                  <input type="file" onChange={(e) => handleUpload(e.target.files[0], `herosection.list.${index}.src`)} className="input w-full text-xs" />
                  {formData.herosection?.list?.[index]?.src && (
                    <div className="mt-2 h-10 overflow-hidden">
                      <span className="text-[10px] truncate block">{formData.herosection.list[index].src}</span>
                    </div>
                  )}
                </div>
                <div className="col-span-5">
                  <label className="label text-xs">Alt Text</label>
                  <input {...register(`herosection.list.${index}.alt`)} className="input w-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('herosection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 2. storySection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">2. Story Section</h2>
            <button type="button" onClick={() => appendStory('')} className="btn-sm">+ Add Paragraph</button>
          </div>
          <div>
            <label className="label">Title</label>
            <input {...register('storySection.title')} className="input w-full" />
          </div>
          <div className="space-y-4">
            {storyList.map((field, index) => (
              <div key={field.id} className="relative">
                <button type="button" onClick={() => removeStory(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
                <textarea {...register(`storySection.paragraphs.${index}`)} className="input w-full" rows="3" placeholder={`Paragraph ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('storySection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 3. challenge */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">3. Challenge Section</h2>
            <button type="button" onClick={() => appendChallenge({ text: '' })} className="btn-sm">+ Add Challenge</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title</label>
              <input {...register('challenge.title')} className="input w-full" />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea {...register('challenge.description')} className="input w-full" rows="1" />
            </div>
          </div>
          <div className="space-y-2">
            {challengeList.map((field, index) => (
              <div key={field.id} className="relative flex gap-2">
                <input {...register(`challenge.list.${index}.text`)} className="input w-full" placeholder="Challenge text" />
                <button type="button" onClick={() => removeChallenge(index)} className="bg-red-900 px-2 rounded">×</button>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('challenge.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 4. startageySection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">4. Strategy Section</h2>
            <button type="button" onClick={() => appendStrategy({ number: '', title: '', description: '' })} className="btn-sm">+ Add Step</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('startageySection.title')} className="input w-full" placeholder="Title" />
            <textarea {...register('startageySection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="space-y-4 mt-4">
            {strategyList.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative grid grid-cols-12 gap-4">
                <button type="button" onClick={() => removeStrategy(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                <div className="col-span-2">
                  <label className="label text-xs">No.</label>
                  <input {...register(`startageySection.list.${index}.number`)} className="input w-full" placeholder="01" />
                </div>
                <div className="col-span-10 space-y-2">
                  <input {...register(`startageySection.list.${index}.title`)} className="input w-full" placeholder="Step Title" />
                  <textarea {...register(`startageySection.list.${index}.description`)} className="input w-full" placeholder="Step Description" rows="2" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('startageySection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 5. executionSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">5. Execution Section</h2>
            <button type="button" onClick={() => appendExecution({ src: '', alt: '', title: '', description: '' })} className="btn-sm">+ Add Item</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('executionSection.title')} className="input w-full" placeholder="Title" />
            <textarea {...register('executionSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="space-y-4">
            {executionList.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative grid grid-cols-12 gap-4">
                <button type="button" onClick={() => removeExecution(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                <div className="col-span-3">
                  <label className="label text-xs">Icon/Image</label>
                  <input type="file" onChange={(e) => handleUpload(e.target.files[0], `executionSection.list.${index}.src`)} className="input w-full text-xs" />
                  {formData.executionSection?.list?.[index]?.src && <img src={formData.executionSection.list[index].src} className="h-10 mt-2" />}
                </div>
                <div className="col-span-9 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input {...register(`executionSection.list.${index}.title`)} className="input w-full" placeholder="Title" />
                    <input {...register(`executionSection.list.${index}.alt`)} className="input w-full" placeholder="Alt text" />
                  </div>
                  <textarea {...register(`executionSection.list.${index}.description`)} className="input w-full" placeholder="Description" rows="2" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('executionSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 6. resultSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">6. Result Section</h2>
            <button type="button" onClick={() => appendResult({ text: '' })} className="btn-sm">+ Add Result</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('resultSection.title')} className="input w-full" placeholder="Title" />
            <textarea {...register('resultSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="space-y-2">
            {resultList.map((field, index) => (
              <div key={field.id} className="relative flex gap-2">
                <input {...register(`resultSection.list.${index}.text`)} className="input w-full" placeholder="Result text" />
                <button type="button" onClick={() => removeResult(index)} className="bg-red-900 px-2 rounded">×</button>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('resultSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 7. whySection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">7. Why This Matters</h2>
            <button type="button" onClick={() => appendWhy({ src: '', alt: '', text: '' })} className="btn-sm">+ Add Item</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('whySection.title')} className="input w-full" placeholder="Title" />
            <textarea {...register('whySection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="space-y-4">
            {whyList.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative grid grid-cols-12 gap-4">
                <button type="button" onClick={() => removeWhy(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                <div className="col-span-3">
                  <label className="label text-xs">Icon</label>
                  <input type="file" onChange={(e) => handleUpload(e.target.files[0], `whySection.list.${index}.src`)} className="input w-full text-xs" />
                  {formData.whySection?.list?.[index]?.src && <img src={formData.whySection.list[index].src} className="h-10 mt-2" />}
                </div>
                <div className="col-span-9 space-y-2">
                  <input {...register(`whySection.list.${index}.alt`)} className="input w-full" placeholder="Alt text" />
                  <textarea {...register(`whySection.list.${index}.text`)} className="input w-full" placeholder="Text" rows="2" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('whySection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        <div className="flex gap-4 sticky bottom-4 bg-zinc-950/90 backdrop-blur p-4 rounded-lg border border-zinc-800 z-10">
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-all disabled:opacity-50"
          >
            {saveMutation.isPending ? 'Saving...' : (isEdit ? 'Update Case Study' : 'Create Case Study')}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-zinc-800 text-white px-8 py-3 rounded-full font-bold hover:bg-zinc-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>

      <style jsx>{`
        .label { display: block; font-size: 0.8125rem; color: #a1a1aa; margin-bottom: 0.375rem; font-weight: 500; }
        .input { background: #09090b; border: 1px solid #27272a; border-radius: 0.375rem; padding: 0.625rem; color: #f4f4f5; outline: none; transition: all 0.2s; font-size: 0.875rem; }
        .input:focus { border-color: #52525b; box-shadow: 0 0 0 2px rgba(82, 82, 91, 0.1); }
        .btn-sm { font-size: 0.75rem; background: #27272a; padding: 0.375rem 0.75rem; rounded: 0.375rem; transition: background 0.2s; }
        .btn-sm:hover { background: #3f3f46; }
      `}</style>
    </div>
  );
}
