'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function ServicesPage() {
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['services']);
      toast.success('Service deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-white p-10 text-center">Loading Services...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">Services Management</h1>
        <Link
          href="/admin/services/new"
          className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
        >
          + Add New Service
        </Link>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-white">
            {services?.map((service) => (
              <tr key={service._id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-medium">{service.name}</td>
                <td className="px-6 py-4 text-zinc-400">{service.slug}</td>
                <td className="px-6 py-4 text-zinc-300">{service.orderNumber ?? '-'}</td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link
                    href={`/admin/services/edit/${service._id}`}
                    className="text-white hover:text-zinc-400 transition-colors text-sm font-semibold"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-500 hover:text-red-400 transition-colors text-sm font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {(!services || services.length === 0) && (
              <tr>
                <td colSpan="3" className="px-6 py-10 text-center text-zinc-500 italic">
                  No services found. Click &quot;Add New Service&quot; to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
