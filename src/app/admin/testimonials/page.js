'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const res = await fetch(`/api/testimonials/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          toast.success('Testimonial deleted successfully');
          fetchTestimonials();
        }
      } catch (error) {
        toast.error('Failed to delete testimonial');
      }
    }
  };

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-zinc-200 transition-colors"
        >
          Add New Testimonial
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-4 px-2">Position</th>
              <th className="py-4 px-2">Rating</th>
              <th className="py-4 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t._id} className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
                <td className="py-4 px-2">{t.position}</td>
                <td className="py-4 px-2">{t.rating}/5</td>
                <td className="py-4 px-2 space-x-4">
                  <Link href={`/admin/testimonials/edit/${t._id}`} className="text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTestimonial(t._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {testimonials.length === 0 && <p className="text-center py-10 text-zinc-500">No testimonials found.</p>}
      </div>
    </div>
  );
}
