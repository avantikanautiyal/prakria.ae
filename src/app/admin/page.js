'use client';

import { useQuery } from '@tanstack/react-query';
import {
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineChatAlt2,
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineUserGroup
} from 'react-icons/hi';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    }
  });

  const cards = [
    { title: 'Blogs', count: stats?.blogs, color: 'text-blue-500', icon: HiOutlineDocumentText, link: '/admin/blogs', desc: 'Manage your blog posts and articles.' },
    { title: 'Case Studies', count: stats?.caseStudies, color: 'text-purple-500', icon: HiOutlineBriefcase, link: '/admin/case-studies', desc: 'Manage portfolio and work showcases.' },
    { title: 'Inquiries', count: stats?.inquiries, color: 'text-green-500', icon: HiOutlineChatAlt2, link: '/admin/inquiries', desc: 'Manage user inquiries and leads.' },
    { title: 'Services', count: stats?.services, color: 'text-orange-500', icon: HiOutlineCollection, link: '/admin/services', desc: 'Manage core service categories.' },
    { title: 'Sub Services', count: stats?.subServices, color: 'text-pink-500', icon: HiOutlineViewGrid, link: '/admin/sub-services', desc: 'Manage detailed service offerings.' },
    { title: 'Testimonials', count: stats?.testimonials, color: 'text-yellow-500', icon: HiOutlineUserGroup, link: '/admin/testimonials', desc: 'Manage client feedback and reviews.' },
  ];

  if (isLoading) {
    return <div className="text-white p-10">Loading Dashboard...</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-zinc-400 mb-10">Overview of your platform&apos;s content and performance.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="group p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-zinc-800 ${card.color}`}>
                  <card.icon size={24} />
                </div>
                <span className="text-4xl font-bold">{card.count || 0}</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{card.title}</h2>
              <p className="text-zinc-400 text-sm mb-6">{card.desc}</p>
            </div>
            <a
              href={card.link}
              className="mt-auto w-full py-2 bg-zinc-800 group-hover:bg-zinc-700 rounded-lg text-center text-sm font-medium transition-colors"
            >
              Manage {card.title} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
