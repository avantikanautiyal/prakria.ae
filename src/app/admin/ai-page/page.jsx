'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { s3Upload } from '@/utils/s3Upload';

export default function AiPageAdmin() {
  const queryClient = useQueryClient();
  const inputClass = 'input w-full bg-zinc-800 text-white placeholder:text-zinc-400';
  const selectClass = 'input w-full bg-zinc-800 text-white';
  const { register, control, handleSubmit, setValue, watch, reset, formState: { isDirty } } = useForm({
    defaultValues: {
      isPublished: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      thumbnailImage: '',
      thumbnailAlt: '',
      heroSection: {
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        videoSrc: '',
        videoPoster: '',
      },
      workSection: {
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        conclusionLine: '',
        list: [{ src: '', alt: '', link: '', mediaType: 'image', poster: '' }],
      },
      whySection: {
        title: '',
        description: '',
        conclusionLine: '',
        list: [{ src: '', title: '', description: '' }],
      },
      coreServicesSection: {
        title: '',
        description: '',
        conclusionLine: '',
      },
      benefitsSection: {
        title: '',
        description: '',
        conclusionLine: '',
        list: [{ src: '', title: '' }],
      },
      faqSection: {
        title: '',
        description: '',
        conclusionLine: '',
        list: [{ question: '', answer: '' }],
      },
    },
  });

  const formData = useWatch({ control });
  const [uploading, setUploading] = useState({});

  const { fields: workItems, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: 'workSection.list',
  });
  const { fields: whyItems, append: appendWhy, remove: removeWhy } = useFieldArray({
    control,
    name: 'whySection.list',
  });
  const { fields: benefitItems, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: 'benefitsSection.list',
  });
  const { fields: faqItems, append: appendFaq, remove: removeFaq } = useFieldArray({
    control,
    name: 'faqSection.list',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['ai-page'],
    queryFn: async () => {
      const res = await fetch('/api/ai-page?includeDrafts=true');
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to fetch AI page');
      return json.data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !isDirty) {
      const normalized = {
        ...data,
        isPublished: data.isPublished !== false,
      };
      reset(normalized);
    }
  }, [data, reset, isDirty]);

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch('/api/ai-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to save AI page');
      return json.data;
    },
    onSuccess: () => {
      toast.success('AI page saved successfully');
      queryClient.invalidateQueries(['ai-page']);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleUpload = async (file, path) => {
    if (!file) return;
    setUploading((prev) => ({ ...prev, [path]: true }));
    try {
      const url = await s3Upload(file);
      setValue(path, url);
      toast.success('File uploaded');
    } catch (error) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      setUploading((prev) => ({ ...prev, [path]: false }));
    }
  };

  if (isLoading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-5xl pb-20 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">AI Page Settings</h1>

      <form onSubmit={handleSubmit((payload) => saveMutation.mutate(payload))} className="space-y-12">
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Publish</h2>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" {...register('isPublished')} />
            Published
          </label>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">SEO</h2>
          <div>
            <label className="label">Meta Title</label>
            <input {...register('metaTitle')} className={inputClass} />
          </div>
          <div>
            <label className="label">Meta Description</label>
            <textarea {...register('metaDescription')} className={inputClass} rows="2" />
          </div>
          <div>
            <label className="label">Meta Keywords</label>
            <input {...register('metaKeywords')} className={inputClass} placeholder="comma separated" />
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Homepage Card</h2>
          <div>
            <label className="label">Thumbnail Image</label>
            <input
              type="file"
              onChange={(e) => handleUpload(e.target.files[0], 'thumbnailImage')}
              className={`${inputClass} text-xs`}
            />
            {watch('thumbnailImage') && (
              <img src={watch('thumbnailImage')} alt="AI thumbnail" className="w-full mt-2 rounded" />
            )}
          </div>
          <div>
            <label className="label">Thumbnail Alt Text</label>
            <input {...register('thumbnailAlt')} className={inputClass} placeholder="AI service thumbnail" />
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Hero Section</h2>
          <div>
            <label className="label">Title</label>
            <input {...register('heroSection.title')} className={inputClass} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('heroSection.description')} className={inputClass} rows="4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Button Text</label>
              <input {...register('heroSection.buttonText')} className={inputClass} />
            </div>
            <div>
              <label className="label">Button Link</label>
              <input {...register('heroSection.buttonLink')} className={inputClass} placeholder="/contact-us" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Hero Video</label>
              <input type="file" onChange={(e) => handleUpload(e.target.files[0], 'heroSection.videoSrc')} className={`${inputClass} text-xs`} />
              {watch('heroSection.videoSrc') && (
                <video src={watch('heroSection.videoSrc')} className="w-full mt-2 rounded" muted />
              )}
            </div>
            <div>
              <label className="label">Video Poster (Optional)</label>
              <input type="file" onChange={(e) => handleUpload(e.target.files[0], 'heroSection.videoPoster')} className={`${inputClass} text-xs`} />
              {watch('heroSection.videoPoster') && (
                <img src={watch('heroSection.videoPoster')} alt="Poster" className="w-full mt-2 rounded" />
              )}
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">Our Work Section</h2>
          </div>
          <div>
            <label className="label">Title</label>
            <input {...register('workSection.title')} className={inputClass} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('workSection.description')} className={inputClass} rows="3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Button Text</label>
              <input {...register('workSection.buttonText')} className={inputClass} />
            </div>
            <div>
              <label className="label">Button Link</label>
              <input {...register('workSection.buttonLink')} className={inputClass} placeholder="/case-study" />
            </div>
          </div>
          <div>
            <label className="label">Conclusion Line</label>
            <input {...register('workSection.conclusionLine')} className={inputClass} />
          </div>
          <p className="text-xs text-zinc-400">
            Leave the work items empty to automatically use AI-featured case studies.
          </p>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h3 className="text-lg font-semibold">Work Items</h3>
            <button
              type="button"
              onClick={() => appendWork({ src: '', alt: '', link: '', mediaType: 'image', poster: '' })}
              className="btn-sm"
            >
              + Add Item
            </button>
          </div>
          <div className="space-y-4">
            {workItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Media</label>
                    <input type="file" onChange={(e) => handleUpload(e.target.files[0], `workSection.list.${index}.src`)} className={`${inputClass} text-xs`} />
                    {formData.workSection?.list?.[index]?.src && (
                      <img src={formData.workSection.list[index].src} alt="Preview" className="w-full mt-2 rounded" />
                    )}
                  </div>
                  <div>
                    <label className="label">Poster (Video)</label>
                    <input type="file" onChange={(e) => handleUpload(e.target.files[0], `workSection.list.${index}.poster`)} className={`${inputClass} text-xs`} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Alt</label>
                    <input {...register(`workSection.list.${index}.alt`)} className={inputClass} />
                  </div>
                  <div>
                    <label className="label">Link</label>
                    <input {...register(`workSection.list.${index}.link`)} className={inputClass} placeholder="/case-study/your-slug" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="label">Media Type</label>
                    <select {...register(`workSection.list.${index}.mediaType`)} className={selectClass}>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="gif">GIF</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => removeWork(index)} className="bg-red-900 px-3 py-2 rounded text-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">Why Choose Section</h2>
            <button type="button" onClick={() => appendWhy({ src: '', title: '', description: '' })} className="btn-sm">
              + Add Item
            </button>
          </div>
          <div>
            <label className="label">Title</label>
            <input {...register('whySection.title')} className={inputClass} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('whySection.description')} className={inputClass} rows="3" />
          </div>
          <div>
            <label className="label">Conclusion Line</label>
            <input {...register('whySection.conclusionLine')} className={inputClass} />
          </div>
          <div className="space-y-4">
            {whyItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded space-y-3">
                <div>
                  <label className="label">Icon</label>
                  <input type="file" onChange={(e) => handleUpload(e.target.files[0], `whySection.list.${index}.src`)} className={`${inputClass} text-xs`} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Title</label>
                    <input {...register(`whySection.list.${index}.title`)} className={inputClass} />
                  </div>
                  <div>
                    <label className="label">Description</label>
                    <input {...register(`whySection.list.${index}.description`)} className={inputClass} />
                  </div>
                </div>
                <button type="button" onClick={() => removeWhy(index)} className="bg-red-900 px-3 py-2 rounded text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Core AI Services Section</h2>
          <div>
            <label className="label">Title</label>
            <input {...register('coreServicesSection.title')} className={inputClass} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('coreServicesSection.description')} className={inputClass} rows="2" />
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">Benefits Section</h2>
            <button type="button" onClick={() => appendBenefit({ src: '', title: '' })} className="btn-sm">
              + Add Item
            </button>
          </div>
          <div>
            <label className="label">Title</label>
            <input {...register('benefitsSection.title')} className={inputClass} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('benefitsSection.description')} className={inputClass} rows="2" />
          </div>
          <div>
            <label className="label">Conclusion Line</label>
            <input {...register('benefitsSection.conclusionLine')} className={inputClass} />
          </div>
          <div className="space-y-4">
            {benefitItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded space-y-3">
                <div>
                  <label className="label">Icon</label>
                  <input type="file" onChange={(e) => handleUpload(e.target.files[0], `benefitsSection.list.${index}.src`)} className={`${inputClass} text-xs`} />
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="label">Title</label>
                    <input {...register(`benefitsSection.list.${index}.title`)} className={inputClass} />
                  </div>
                  <button type="button" onClick={() => removeBenefit(index)} className="bg-red-900 px-3 py-2 rounded text-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">FAQ Section</h2>
            <button type="button" onClick={() => appendFaq({ question: '', answer: '' })} className="btn-sm">
              + Add Item
            </button>
          </div>
          <div>
            <label className="label">Title</label>
            <input {...register('faqSection.title')} className={inputClass} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('faqSection.description')} className={inputClass} rows="2" />
          </div>
          <div className="space-y-4">
            {faqItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded space-y-3">
                <div>
                  <label className="label">Question</label>
                  <input {...register(`faqSection.list.${index}.question`)} className={inputClass} />
                </div>
                <div>
                  <label className="label">Answer</label>
                  <textarea {...register(`faqSection.list.${index}.answer`)} className={inputClass} rows="2" />
                </div>
                <button type="button" onClick={() => removeFaq(index)} className="bg-red-900 px-3 py-2 rounded text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? 'Saving...' : 'Save AI Page'}
          </button>
        </div>
      </form>
    </div>
  );
}
