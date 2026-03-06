'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { s3Upload } from '@/utils/s3Upload';
import { useFormAutoSave, useNavigationGuard } from '@/hooks/useFormAutoSave';


export default function ServiceForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!params.id;

  const { register, control, handleSubmit, setValue, watch, reset, formState: { isDirty } } = useForm({
    defaultValues: {
      name: '',
      slug: '',
      image: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      herosection: { title: '', description: '', buttonText: 'Enquire Now', buttonLink: '/contact-us', conclusionLine: '' },
      workSection: { title: '', description: '', buttonText: '', buttonLink: '', list: [{ url: '', mediaType: 'image', alt: '', slug: '', title: '', description: '' }], conclusionLine: '' },
      whyChooseSection: { title: '', description: '', list: [{ icon: '', title: '', description: '' }], conclusionLine: '' },
      coreServicesSection: { title: '', list: [{ icon: '', tabTitle: '', contentTitle: '', description: '', focusList: [''], bottomBox: '' }], conclusionLine: '' },
      howWeWorkSection: { title: '', description: '', list: [{ number: '', title: '', description: '' }], conclusionLine: '' },
      benefitsSection: { title: '', description: '', list: [{ icon: '', title: '' }], missionBox: '', conclusionLine: '' },
      faqSection: { title: '', description: '', list: [{ question: '', answer: '' }], conclusionLine: '' }
    }
  });

  const { fields: whyItems, append: appendWhy, remove: removeWhy } = useFieldArray({ control, name: 'whyChooseSection.list' });
  const { fields: coreItems, append: appendCore, remove: removeCore } = useFieldArray({ control, name: 'coreServicesSection.list' });
  const { fields: howItems, append: appendHow, remove: removeHow } = useFieldArray({ control, name: 'howWeWorkSection.list' });
  const { fields: benefitItems, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: 'benefitsSection.list' });
  const { fields: faqItems, append: appendFaq, remove: removeFaq } = useFieldArray({ control, name: 'faqSection.list' });
  const { fields: workItems, append: appendWork, remove: removeWork } = useFieldArray({ control, name: 'workSection.list' });

  const formData = useWatch({ control });
  const [uploading, setUploading] = useState({});

  // Fetch Data
  const { isLoading } = useQuery({
    queryKey: ['service', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/services/${params.id}`);
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch');
      reset(data.data);
      return data.data;
    },
    enabled: isEdit,
  });

  const { clearStorage } = useFormAutoSave({
    key: `service-${params.id || 'new'}`,
    watchValues: formData,
    reset,
    enabled: !isLoading
  });

  useNavigationGuard(isDirty);

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const url = isEdit ? `/api/services/${params.id}` : '/api/services';
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
      clearStorage();
      toast.success('Service saved successfully');
      queryClient.invalidateQueries(['services']);
      router.push('/admin/services');
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

  const handleWorkImageUpload = async (file) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, 'workSection.list': true }));
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        appendWork({ url: data.url, mediaType: 'image', alt: '', slug: '', title: '', description: '' });
        toast.success('Media added to portfolio');
      } else throw new Error(data.error);
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(prev => ({ ...prev, 'workSection.list': false }));
    }
  };

  if (isEdit && isLoading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-5xl pb-20 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Service' : 'New Service'}</h1>

      <form onSubmit={handleSubmit(data => saveMutation.mutate(data))} className="space-y-12">
        
        {/* Basic & SEO Info */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Basic & SEO Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Service Name</label>
              <input {...register('name', { required: true })} className="input w-full" placeholder="Digital Marketing" />
            </div>
            <div>
              <label className="label">Slug</label>
              <input {...register('slug', { required: true })} className="input w-full" placeholder="digital-marketing" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Meta Title</label>
              <input {...register('metaTitle')} className="input w-full" />
            </div>
            <div className="col-span-2">
              <label className="label">Meta Description</label>
              <textarea {...register('metaDescription')} className="input w-full" rows="1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Meta Keywords</label>
              <input {...register('metaKeywords')} className="input w-full" placeholder="comma separated" />
            </div>
            <div>
              <label className="label">Service Grid Image (Main)</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  onChange={(e) => handleUpload(e.target.files[0], 'image')}
                  className="input flex-1"
                />
                {watch('image') && (
                  <div className="w-12 h-12 rounded border border-zinc-700 overflow-hidden flex-shrink-0 bg-black">
                    <img src={watch('image')} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 1. herosection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">1. Hero Section</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title</label>
              <input {...register('herosection.title')} className="input w-full" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Button Text</label>
                <input {...register('herosection.buttonText')} className="input w-full" />
              </div>
              <div>
                <label className="label">Button Link</label>
                <input {...register('herosection.buttonLink')} className="input w-full" />
              </div>
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('herosection.description')} className="input w-full" rows="3" />
          </div>
          <div>
            <label className="label">Section Conclusion</label>
            <textarea {...register('herosection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 2. workSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">2. Our Work (Portfolio)</h2>
            <button type="button" onClick={() => appendWork({ url: '', mediaType: 'image', alt: '', slug: '', title: '', description: '' })} className="btn-sm">+ Add Item</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title</label>
              <input {...register('workSection.title')} className="input w-full" />
            </div>
            <div>
              <label className="label">Description</label>
              <input {...register('workSection.description')} className="input w-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Button Text</label>
              <input {...register('workSection.buttonText')} className="input w-full" placeholder="e.g. View All Work" />
            </div>
            <div>
              <label className="label">Button Link</label>
              <input {...register('workSection.buttonLink')} className="input w-full" placeholder="/portfolio" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="label">Add Portfolio Images</label>
            {/* <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                files.forEach(file => handleWorkImageUpload(file));
              }}
              className="input w-full"
            /> */}
            <div className="grid grid-cols-1 gap-6 mt-4">
              {workItems.map((field, index) => (
                <div key={field.id} className="relative group p-6 bg-zinc-950/40 rounded-xl border border-zinc-800 space-y-4">
                  <div className="flex gap-6">
                    <div className="w-48 h-48 flex-shrink-0 bg-black rounded-lg overflow-hidden border border-zinc-800 relative group/media">
                      {formData.workSection?.list?.[index]?.url ? (
                        formData.workSection.list[index].mediaType === 'video' ? (
                          <video src={formData.workSection.list[index].url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={formData.workSection.list[index].url} className="w-full h-full object-cover" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">No Media</div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/media:opacity-100 flex items-center justify-center transition-opacity">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => handleUpload(e.target.files[0], `workSection.list.${index}.url`)}
                        />
                        <span className="text-[10px] font-bold">Change Media</span>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="col-span-2 grid grid-cols-3 gap-3">
                        <div>
                          <label className="label text-[10px]">Media Type</label>
                          <select {...register(`workSection.list.${index}.mediaType`)} className="input w-full text-xs h-8 py-0">
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="gif">GIF</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="label text-[10px]">Alt Tag (SEO)</label>
                          <input {...register(`workSection.list.${index}.alt`)} className="input w-full text-xs h-8" placeholder="e.g. Branding for Nestle" />
                        </div>
                      </div>

                      <div>
                        <label className="label text-[10px]">Title</label>
                        <input {...register(`workSection.list.${index}.title`)} className="input w-full text-xs h-8" placeholder="Project Title" />
                      </div>
                      <div>
                        <label className="label text-[10px]">Slug</label>
                        <input {...register(`workSection.list.${index}.slug`)} className="input w-full text-xs h-8" placeholder="e.g. nestle-nido" />
                      </div>

                      <div className="col-span-2">
                        <label className="label text-[10px]">Description</label>
                        <textarea {...register(`workSection.list.${index}.description`)} className="input w-full text-xs" rows="2" placeholder="Brief project description..." />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => removeWork(index)}
                    className="absolute -top-3 -right-3 bg-red-600 rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-xl hover:bg-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Section Conclusion</label>
            <textarea {...register('workSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 3. whyChooseSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">3. Why Choose Us</h2>
            <button type="button" onClick={() => appendWhy({ icon: '', title: '', description: '' })} className="btn-sm">+ Add Card</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('whyChooseSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('whyChooseSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {whyItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative space-y-3">
                <button type="button" onClick={() => removeWhy(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="label">Icon</label>
                    <input type="file" onChange={(e) => handleUpload(e.target.files[0], `whyChooseSection.list.${index}.icon`)} className="input w-full text-[10px]" />
                    {formData.whyChooseSection?.list?.[index]?.icon && <img src={formData.whyChooseSection.list[index].icon} className="h-6 mt-1 bg-zinc-800 p-0.5" />}
                  </div>
                  <div>
                    <label className="label">Title</label>
                    <input {...register(`whyChooseSection.list.${index}.title`)} className="input w-full h-8" />
                  </div>
                </div>
                <div>
                  <label className="label text-xs">Description</label>
                  <textarea {...register(`whyChooseSection.list.${index}.description`)} className="input w-full text-xs" rows="2" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <label className="label">Section Conclusion</label>
            <textarea {...register('whyChooseSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 4. coreServicesSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">4. Core Services (Tabs)</h2>
            <button type="button" onClick={() => appendCore({ icon: '', tabTitle: '', contentTitle: '', description: '', focusList: [''], bottomBox: '' })} className="btn-sm">+ Add Tab</button>
          </div>
          <input {...register('coreServicesSection.title')} className="input w-full mb-4" placeholder="Section Title" />
          <div className="space-y-6">
            {coreItems.map((field, index) => (
              <div key={field.id} className="p-6 border border-zinc-700 rounded-lg relative bg-zinc-950/30">
                <button type="button" onClick={() => removeCore(index)} className="absolute -top-3 -right-3 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center font-bold">×</button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="label text-xs">Icon</label>
                      <input type="file" onChange={(e) => handleUpload(e.target.files[0], `coreServicesSection.list.${index}.icon`)} className="input w-full text-[10px]" />
                      {formData.coreServicesSection?.list?.[index]?.icon && <img src={formData.coreServicesSection.list[index].icon} className="h-6 mt-1 bg-black p-0.5" />}
                    </div>
                    <div>
                      <label className="label text-xs">Tab Title</label>
                      <input {...register(`coreServicesSection.list.${index}.tabTitle`)} className="input w-full text-sm" placeholder="SEO" />
                    </div>
                  </div>
                  <div>
                    <label className="label text-xs">Content Title</label>
                    <input {...register(`coreServicesSection.list.${index}.contentTitle`)} className="input w-full text-sm" placeholder="SEO (Search Engine Optimization)" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="label text-xs">Description</label>
                  <textarea {...register(`coreServicesSection.list.${index}.description`)} className="input w-full text-xs" rows="2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label text-xs">Focus Points (JSON array string)</label>
                    <textarea 
                      className="input w-full text-xs font-mono" 
                      placeholder='["Keyword research", "Backlink building"]'
                      rows="2"
                      onBlur={(e) => {
                        try {
                          const val = JSON.parse(e.target.value);
                          if (Array.isArray(val)) setValue(`coreServicesSection.list.${index}.focusList`, val);
                        } catch (err) {}
                      }}
                      defaultValue={JSON.stringify(field.focusList)}
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Bottom Highlight Box</label>
                    <textarea {...register(`coreServicesSection.list.${index}.bottomBox`)} className="input w-full text-xs" rows="2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <label className="label">Section Conclusion</label>
            <textarea {...register('coreServicesSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 5. howWeWorkSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">5. How We Work (Steps)</h2>
            <button type="button" onClick={() => appendHow({ number: '', title: '', description: '' })} className="btn-sm">+ Add Step</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('howWeWorkSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('howWeWorkSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="space-y-4 mt-4">
            {howItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative flex gap-4">
                <button type="button" onClick={() => removeHow(index)} className="absolute top-2 right-2 text-red-500 font-bold">×</button>
                <div className="w-20">
                  <label className="label text-xs">No.</label>
                  <input {...register(`howWeWorkSection.list.${index}.number`)} className="input w-full text-lg font-bold" placeholder="01" />
                </div>
                <div className="flex-1 space-y-2">
                  <input {...register(`howWeWorkSection.list.${index}.title`)} className="input w-full font-semibold" placeholder="Title" />
                  <textarea {...register(`howWeWorkSection.list.${index}.description`)} className="input w-full text-sm" placeholder="Description" rows="2" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <label className="label">Section Conclusion</label>
            <textarea {...register('howWeWorkSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 6. benefitsSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">6. Benefits</h2>
            <button type="button" onClick={() => appendBenefit({ icon: '', title: '' })} className="btn-sm">+ Add Benefit</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('benefitsSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('benefitsSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {benefitItems.map((field, index) => (
              <div key={field.id} className="p-3 border border-zinc-800 rounded relative space-y-2 text-xs">
                <button type="button" onClick={() => removeBenefit(index)} className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">×</button>
                <input type="file" onChange={(e) => handleUpload(e.target.files[0], `benefitsSection.list.${index}.icon`)} className="input w-full text-[10px]" />
                {formData.benefitsSection?.list?.[index]?.icon && <img src={formData.benefitsSection.list[index].icon} className="h-6 mx-auto bg-zinc-800 p-0.5" />}
                <input {...register(`benefitsSection.list.${index}.title`)} className="input w-full h-8" placeholder="Benefit title" />
              </div>
            ))}
          </div>
          <div>
            <label className="label">Mission Statement Box</label>
            <textarea {...register('benefitsSection.missionBox')} className="input w-full" rows="2" placeholder="We have a very straightforward mission..." />
          </div>
          <div>
            <label className="label">Section Conclusion</label>
            <textarea {...register('benefitsSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 7. faqSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">7. FAQ Section</h2>
            <button type="button" onClick={() => appendFaq({ question: '', answer: '' })} className="btn-sm">+ Add FAQ Item</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('faqSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('faqSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="space-y-4 mt-4">
            {faqItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative space-y-3 bg-zinc-950/20">
                <button type="button" onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-red-500">×</button>
                <input {...register(`faqSection.list.${index}.question`)} className="input w-full font-medium" placeholder="What is Digital Marketing?" />
                <textarea {...register(`faqSection.list.${index}.answer`)} className="input w-full text-sm text-zinc-400" placeholder="Answer..." rows="3" />
              </div>
            ))}
          </div>
          <div className="pt-2">
            <label className="label">Section Conclusion</label>
            <textarea {...register('faqSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        <div className="flex gap-4 sticky bottom-4 bg-zinc-950/90 backdrop-blur p-4 rounded-lg border border-zinc-800 z-10">
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-all disabled:opacity-50"
          >
            {saveMutation.isPending ? 'Saving...' : (isEdit ? 'Update Service' : 'Create Service')}
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
        .btn-sm { font-size: 0.75rem; background: #27272a; padding: 0.375rem 0.75rem; border-radius: 0.375rem; transition: background 0.2s; }
        .btn-sm:hover { background: #3f3f46; }
      `}</style>
    </div>
  );
}
