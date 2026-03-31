'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    // Check sessionStorage for login state
    const loggedIn = sessionStorage.getItem('admin_logged_in');
    if (loggedIn === 'true') {
      setIsAuthorized(true);
    } else {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    toast.success('Logged out successfully');
    window.location.href = '/admin/login';
  };

  if (!isAuthorized && pathname !== '/admin/login') {
    return (
      <div className="flex min-h-screen bg-black text-white items-center justify-center">
        <div className="text-xl font-bold animate-pulse text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

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
          <Link href="/admin/homepage" className="block hover:text-zinc-400 transition-colors">
            Homepage
          </Link>
          <Link href="/admin/services" className="block hover:text-zinc-400 transition-colors">
            Services
          </Link>
          <Link href="/admin/sub-services" className="block hover:text-zinc-400 transition-colors">
            AI Sub Services
          </Link>
          <Link href="/admin/ai-page" className="block hover:text-zinc-400 transition-colors">
            AI Page
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
