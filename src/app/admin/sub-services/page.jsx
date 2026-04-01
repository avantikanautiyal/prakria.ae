'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function SubServicesPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['sub-services'],
    queryFn: async () => {
      const res = await fetch('/api/sub-services?includeDrafts=true');
      const json = await res.json();
      return json.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/sub-services/${id}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sub-services']);
      toast.success('Sub-service deleted');
    }
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this sub-service?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Sub AI Services</h1>
        <Link 
          href="/admin/sub-services/new" 
          className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
        >
          Add New Sub-Service
        </Link>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data?.map((service) => (
              <tr key={service._id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-medium">{service.name}</td>
                <td className="px-6 py-4 text-zinc-400">{service.category}</td>
                <td className="px-6 py-4 text-zinc-400">{service.slug}</td>
                <td className="px-6 py-4">
                  <span className={service.isPublished === false ? 'text-yellow-400' : 'text-green-400'}>
                    {service.isPublished === false ? 'Draft' : 'Published'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <Link 
                      href={`/admin/sub-services/edit/${service._id}`}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(service._id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-zinc-500">
                  No sub-services found. Start by adding one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
