'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function CaseStudyListPage() {
  const queryClient = useQueryClient();

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const res = await fetch('/api/case-studies');
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch case studies');
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error('Failed to delete');
      return data;
    },
    onSuccess: () => {
      toast.success('Case study deleted');
      queryClient.invalidateQueries(['case-studies']);
    },
    onError: (error) => toast.error(error.message),
  });

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Case Studies</h1>
        <Link 
          href="/admin/case-studies/new" 
          className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-zinc-200 transition-colors"
        >
          Add New Case Study
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Meta Title</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {caseStudies?.map((cs) => (
              <tr key={cs._id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-medium">{cs.name}</td>
                <td className="px-6 py-4 text-zinc-400">{cs.slug}</td>
                <td className="px-6 py-4 text-zinc-400 truncate max-w-xs">{cs.metaTitle}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <Link 
                      href={`/admin/case-studies/edit/${cs._id}`}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure?')) deleteMutation.mutate(cs._id);
                      }}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {caseStudies?.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-zinc-500">
                  No case studies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
