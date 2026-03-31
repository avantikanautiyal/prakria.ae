'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function HomePageSectionsList() {
  const queryClient = useQueryClient();

  const { data: sections, isLoading } = useQuery({
    queryKey: ['homepage-sections'],
    queryFn: async () => {
      const res = await fetch('/api/homepage/sections');
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch sections');
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/homepage/sections/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error('Failed to delete section');
      return data;
    },
    onSuccess: () => {
      toast.success('Homepage section deleted');
      queryClient.invalidateQueries(['homepage-sections']);
    },
    onError: (error) => toast.error(error.message),
  });

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Homepage Sections</h1>
        <Link
          href="/admin/homepage/new"
          className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-zinc-200 transition-colors"
        >
          Add New Section
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">CTA Link</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Active</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {sections?.map((section) => (
              <tr key={section._id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-medium">{section.title}</td>
                <td className="px-6 py-4 text-zinc-400">{section.ctaLink}</td>
                <td className="px-6 py-4 text-zinc-400">{section.items?.length || 0}</td>
                <td className="px-6 py-4 text-zinc-400">{section.order ?? 0}</td>
                <td className="px-6 py-4 text-zinc-400">{section.isActive ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <Link
                      href={`/admin/homepage/edit/${section._id}`}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure?')) deleteMutation.mutate(section._id);
                      }}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sections?.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-zinc-500">
                  No homepage sections found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
