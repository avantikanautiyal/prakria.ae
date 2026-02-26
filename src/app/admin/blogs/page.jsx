'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        const res = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          toast.success('Blog deleted successfully');
          fetchBlogs();
        }
      } catch (error) {
        toast.error('Failed to delete blog');
      }
    }
  };

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-zinc-200 transition-colors"
        >
          Add New Blog
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-4 px-2">Title</th>
              <th className="py-4 px-2">Author</th>
              <th className="py-4 px-2">Date</th>
              <th className="py-4 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
                <td className="py-4 px-2">{blog.title}</td>
                <td className="py-4 px-2">{blog.author}</td>
                <td className="py-4 px-2">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-2 space-x-4">
                  <Link href={`/admin/blogs/edit/${blog._id}`} className="text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && <p className="text-center py-10 text-zinc-500">No blogs found.</p>}
      </div>
    </div>
  );
}
