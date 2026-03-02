'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success('Logged out successfully');
        router.push('/admin/login');
        router.refresh();
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-6">
        <h2 className="text-xl font-bold mb-8">Prakria Admin</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-zinc-400 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/blogs" className="block hover:text-zinc-400 transition-colors">
            Blogs
          </Link>
          <Link href="/admin/testimonials" className="block hover:text-zinc-400 transition-colors">
            Testimonials
          </Link>
          <Link href="/admin/case-studies" className="block hover:text-zinc-400 transition-colors">
            Case Studies
          </Link>
          <Link href="/admin/services" className="block hover:text-zinc-400 transition-colors">
            Services
          </Link>
          <Link href="/admin/sub-services" className="block hover:text-zinc-400 transition-colors">
            AI Sub Services
          </Link>
          <Link href="/admin/inquiries" className="block hover:text-zinc-400 transition-colors">
            Inquiries
          </Link>
          <button
            onClick={handleLogout}
            className="block text-red-500 hover:text-red-400 transition-colors pt-4 mt-8 border-t border-zinc-800 w-full text-left"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {children}
      </div>
    </div>
  );
}
