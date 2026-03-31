'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { s3Upload } from '@/utils/s3Upload';
import { useFormAutoSave, useNavigationGuard } from '@/hooks/useFormAutoSave';


export default function SubServiceForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!params.id;

  const { register, control, handleSubmit, setValue, watch, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      name: '',
      slug: '',
      category: '',
      isPublished: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      herosection: { title: '', description: '', buttonText: 'Start a Project', icon: '' },
      introSection: { title: '', description: '' },
      servicesSection: { title: '', subtitle: '', list: [{ title: '' }] },
      whyChooseSection: { title: '', description: '', list: [{ number: '', title: '', description: '' }] },
      expertiseSection: { title: '', description: '', list: [{ title: '' }] },
      platformsSection: { title: '', description: '', list: [{ icon: '', title: '' }] },
      differentiatorsSection: { title: '', description: '', list: [{ title: '' }] },
      useCasesSection: { title: '', description: '', list: [{ icon: '', title: '' }] },
      relatedServicesSection: { title: '', list: [{ icon: '', title: '', description: '', buttonText: 'Read more', buttonLink: '' }] }
    }
  });

  const { fields: serviceItems, append: appendService, remove: removeService } = useFieldArray({ control, name: 'servicesSection.list' });
  const { fields: whyItems, append: appendWhy, remove: removeWhy } = useFieldArray({ control, name: 'whyChooseSection.list' });
  const { fields: expertiseItems, append: appendExpertise, remove: removeExpertise } = useFieldArray({ control, name: 'expertiseSection.list' });
  const { fields: platformItems, append: appendPlatform, remove: removePlatform } = useFieldArray({ control, name: 'platformsSection.list' });
  const { fields: differentItems, append: appendDifferent, remove: removeDifferent } = useFieldArray({ control, name: 'differentiatorsSection.list' });
  const { fields: useCaseItems, append: appendUseCase, remove: removeUseCase } = useFieldArray({ control, name: 'useCasesSection.list' });
  const { fields: relatedItems, append: appendRelated, remove: removeRelated } = useFieldArray({ control, name: 'relatedServicesSection.list' });

  const formData = useWatch({ control });
  const [uploading, setUploading] = useState({});

  // Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ['sub-service', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/sub-services/${params.id}`);
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch');
      return data.data;
    },
    refetchOnWindowFocus: false,
    enabled: isEdit,
  });

  // Initialize form with fetched data
  useEffect(() => {
    if (data && !isDirty) {
      const normalized = {
        ...data,
        isPublished: data.isPublished !== false,
      };
      reset(normalized);
    }
  }, [data, reset, isDirty]);

  const { clearStorage } = useFormAutoSave({
    key: `sub-service-${params.id || 'new'}`,
    watchValues: formData,
    reset,
    enabled: !isLoading
  });

  useNavigationGuard(isDirty);

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const url = isEdit ? `/api/sub-services/${params.id}` : '/api/sub-services';
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
      toast.success('Sub-service saved successfully');
      queryClient.invalidateQueries(['sub-services']);
      router.push('/admin/sub-services');
    },
    onError: (err) => toast.error(err.message),
  });

  const handleUpload = async (file, path) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [path]: true }));

    try {
      const url = await s3Upload(file);
      setValue(path, url);
      toast.success('File uploaded successfully');
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [path]: false }));
    }
  };

  if (isEdit && isLoading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-5xl pb-20 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Sub-Service' : 'New Sub-Service'}</h1>

      <form onSubmit={handleSubmit(data => saveMutation.mutate(data))} className="space-y-12">
        
        {/* Basic & SEO Info */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Basic & SEO Info</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Name</label>
              <input {...register('name', { required: true })} className="input w-full" />
            </div>
            <div>
              <label className="label">Slug</label>
              <input {...register('slug', { required: true })} className="input w-full" />
            </div>
            <div>
              <label className="label">Category</label>
              <input {...register('category')} className="input w-full" />
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
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" {...register('isPublished')} />
            Published
          </label>
        </section>

        {/* 1. herosection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">1. Hero Section</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title</label>
              <input {...register('herosection.title')} className="input w-full" />
            </div>
            <div>
              <label className="label">Button Text</label>
              <input {...register('herosection.buttonText')} className="input w-full" />
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('herosection.description')} className="input w-full" rows="3" />
          </div>
          <div>
            <label className="label">Hero Icon (Top Left)</label>
            <input type="file" onChange={(e) => handleUpload(e.target.files[0], 'herosection.icon')} className="input w-full" />
            {formData.herosection?.icon && <img src={formData.herosection.icon} className="h-10 mt-2 bg-zinc-800 p-1" />}
          </div>
          <div className="pt-2">
            <label className="label">Section Conclusion</label>
            <textarea {...register('herosection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 2. introSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">2. Intro Section</h2>
          <div>
            <label className="label">Professional Title</label>
            <input {...register('introSection.title')} className="input w-full" />
          </div>
          <div>
            <label className="label">Intro Description</label>
            <textarea {...register('introSection.description')} className="input w-full" rows="4" />
          </div>
          <div className="pt-2">
            <label className="label">Section Conclusion</label>
            <textarea {...register('introSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 3. servicesSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">3. Services Grid</h2>
            <button type="button" onClick={() => appendService({ title: '' })} className="btn-sm">+ Add Item</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('servicesSection.title')} className="input w-full" placeholder="Section Title" />
            <input {...register('servicesSection.subtitle')} className="input w-full" placeholder="Subtitle" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {serviceItems.map((field, index) => (
              <div key={field.id} className="relative flex gap-2">
                <input {...register(`servicesSection.list.${index}.title`)} className="input w-full" placeholder="Service text" />
                <button type="button" onClick={() => removeService(index)} className="bg-red-900 px-3 rounded text-sm">×</button>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('servicesSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 4. whyChooseSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">4. Advantages (Why Choose)</h2>
            <button type="button" onClick={() => appendWhy({ number: '', title: '', description: '' })} className="btn-sm">+ Add Advantage</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('whyChooseSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('whyChooseSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="space-y-4 mt-4">
            {whyItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative grid grid-cols-12 gap-4">
                <button type="button" onClick={() => removeWhy(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                <div className="col-span-2">
                  <label className="label text-xs">No.</label>
                  <input {...register(`whyChooseSection.list.${index}.number`)} className="input w-full text-sm" placeholder="01" />
                </div>
                <div className="col-span-10 space-y-2">
                  <input {...register(`whyChooseSection.list.${index}.title`)} className="input w-full text-sm" placeholder="Title" />
                  <textarea {...register(`whyChooseSection.list.${index}.description`)} className="input w-full text-sm" placeholder="Description" rows="2" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('whyChooseSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 5. expertiseSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">5. Expertise/Process</h2>
            <button type="button" onClick={() => appendExpertise({ title: '' })} className="btn-sm">+ Add Item</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('expertiseSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('expertiseSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {expertiseItems.map((field, index) => (
              <div key={field.id} className="relative flex gap-1">
                <input {...register(`expertiseSection.list.${index}.title`)} className="input w-full text-xs" />
                <button type="button" onClick={() => removeExpertise(index)} className="bg-red-900/50 px-1 rounded text-[10px]">×</button>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('expertiseSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 6. platformsSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">6. Platforms Optimization</h2>
            <button type="button" onClick={() => appendPlatform({ icon: '', title: '' })} className="btn-sm">+ Add Platform</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('platformsSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('platformsSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {platformItems.map((field, index) => (
              <div key={field.id} className="p-3 border border-zinc-800 rounded relative space-y-2">
                <button type="button" onClick={() => removePlatform(index)} className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">×</button>
                <input type="file" onChange={(e) => handleUpload(e.target.files[0], `platformsSection.list.${index}.icon`)} className="input w-full text-[10px]" />
                {formData.platformsSection?.list?.[index]?.icon && <img src={formData.platformsSection.list[index].icon} className="h-6 mx-auto bg-zinc-800 p-0.5" />}
                <input {...register(`platformsSection.list.${index}.title`)} className="input w-full text-xs" placeholder="Platform name" />
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('platformsSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 7. differentiatorsSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">7. Differentiators</h2>
            <button type="button" onClick={() => appendDifferent({ title: '' })} className="btn-sm">+ Add Item</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('differentiatorsSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('differentiatorsSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {differentItems.map((field, index) => (
              <div key={field.id} className="relative flex gap-1">
                <input {...register(`differentiatorsSection.list.${index}.title`)} className="input w-full text-[10px]" />
                <button type="button" onClick={() => removeDifferent(index)} className="bg-red-900/50 px-1 rounded text-[10px]">×</button>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('differentiatorsSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 8. useCasesSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">8. Use Cases</h2>
            <button type="button" onClick={() => appendUseCase({ icon: '', title: '' })} className="btn-sm">+ Add Use Case</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input {...register('useCasesSection.title')} className="input w-full" placeholder="Section Title" />
            <textarea {...register('useCasesSection.description')} className="input w-full" placeholder="Description" rows="1" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {useCaseItems.map((field, index) => (
              <div key={field.id} className="p-3 border border-zinc-800 rounded relative space-y-2">
                <button type="button" onClick={() => removeUseCase(index)} className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">×</button>
                <input type="file" onChange={(e) => handleUpload(e.target.files[0], `useCasesSection.list.${index}.icon`)} className="input w-full text-[10px]" />
                {formData.useCasesSection?.list?.[index]?.icon && <img src={formData.useCasesSection.list[index].icon} className="h-6 mx-auto bg-zinc-800 p-0.5" />}
                <input {...register(`useCasesSection.list.${index}.title`)} className="input w-full text-xs" placeholder="Use case name" />
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('useCasesSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        {/* 9. relatedServicesSection */}
        <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-semibold">9. Related Services</h2>
            <button type="button" onClick={() => appendRelated({ icon: '', title: '', description: '', buttonText: 'Read more', buttonLink: '' })} className="btn-sm">+ Add Service</button>
          </div>
          <div>
            <label className="label">Section Title</label>
            <input {...register('relatedServicesSection.title')} className="input w-full" placeholder="Related Services" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {relatedItems.map((field, index) => (
              <div key={field.id} className="p-4 border border-zinc-800 rounded relative space-y-3">
                <button type="button" onClick={() => removeRelated(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="label text-xs">Icon</label>
                    <input type="file" onChange={(e) => handleUpload(e.target.files[0], `relatedServicesSection.list.${index}.icon`)} className="input w-full text-[10px]" />
                    {formData.relatedServicesSection?.list?.[index]?.icon && <img src={formData.relatedServicesSection.list[index].icon} className="h-6 mt-1 bg-zinc-800 p-0.5" />}
                  </div>
                  <div>
                    <label className="label text-xs">Title</label>
                    <input {...register(`relatedServicesSection.list.${index}.title`)} className="input w-full text-sm" />
                  </div>
                </div>
                <div>
                  <label className="label text-xs">Description</label>
                  <textarea {...register(`relatedServicesSection.list.${index}.description`)} className="input w-full text-xs" rows="2" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="label text-xs">Button Text</label>
                    <input {...register(`relatedServicesSection.list.${index}.buttonText`)} className="input w-full text-[10px]" />
                  </div>
                  <div>
                    <label className="label text-xs">Button Link</label>
                    <input {...register(`relatedServicesSection.list.${index}.buttonLink`)} className="input w-full text-[10px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label className="label">Section Conclusion</label>
            <textarea {...register('relatedServicesSection.conclusionLine')} className="input w-full" rows="1" />
          </div>
        </section>

        <div className="flex gap-4 sticky bottom-4 bg-zinc-950/90 backdrop-blur p-4 rounded-lg border border-zinc-800 z-10">
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-all disabled:opacity-50"
          >
            {saveMutation.isPending ? 'Saving...' : (isEdit ? 'Update Sub-Service' : 'Create Sub-Service')}
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
