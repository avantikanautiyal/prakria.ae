'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

export default function InquiriesPage() {
  const queryClient = useQueryClient();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      const res = await fetch('/api/inquiries');
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['inquiries']);
      toast.success('Status updated');
    }
  });

  const handleMarkAsRead = (inquiry) => {
    if (inquiry.status === 'unread') {
      updateStatusMutation.mutate({ id: inquiry._id, status: 'read' });
    }
    setSelectedInquiry(inquiry);
  };

  if (isLoading) return <div className="text-white p-10">Loading Inquiries...</div>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-10">User Inquiries</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* List */}
        <div className={`${selectedInquiry ? 'col-span-12 xl:col-span-5' : 'col-span-12'} transition-all`}>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {inquiries?.map((inquiry) => (
                  <tr 
                    key={inquiry._id} 
                    className={`hover:bg-zinc-800/50 transition-colors cursor-pointer ${inquiry.status === 'unread' ? 'bg-zinc-800/20' : ''} ${selectedInquiry?._id === inquiry._id ? 'bg-zinc-800' : ''}`}
                    onClick={() => handleMarkAsRead(inquiry)}
                  >
                    <td className="px-6 py-4">
                      <span className={`w-2 h-2 rounded-full inline-block ${inquiry.status === 'unread' ? 'bg-blue-500' : inquiry.status === 'read' ? 'bg-zinc-600' : 'bg-green-500'}`}></span>
                    </td>
                    <td className="px-6 py-4 font-medium">{inquiry.fullName}</td>
                    <td className="px-6 py-4 text-zinc-400 truncate max-w-[200px]">{inquiry.subject}</td>
                    <td className="px-6 py-4 text-zinc-400 text-xs">
                      {format(new Date(inquiry.createdAt), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-zinc-400 hover:text-white transition-colors text-sm">View</button>
                    </td>
                  </tr>
                ))}
                {(!inquiries || inquiries.length === 0) && (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-zinc-500">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail View */}
        {selectedInquiry && (
          <div className="col-span-12 xl:col-span-7">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 sticky top-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedInquiry.subject}</h2>
                  <p className="text-zinc-400 text-sm">{format(new Date(selectedInquiry.createdAt), 'PPPP p')}</p>
                </div>
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="text-zinc-500 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 bg-zinc-800/30 p-4 rounded-lg">
                <div>
                  <label className="text-xs text-zinc-500 uppercase block mb-1">From</label>
                  <p className="font-semibold">{selectedInquiry.fullName}</p>
                  <p className="text-zinc-400 text-sm">{selectedInquiry.email}</p>
                  <p className="text-zinc-400 text-sm">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase block mb-1">Company</label>
                  <p className="font-semibold">{selectedInquiry.company}</p>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-500 uppercase block mb-3">Message</label>
                <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800 text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a 
                  href={`mailto:${selectedInquiry.email}`}
                  className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors text-sm"
                >
                  Reply via Email
                </a>
                <button 
                  onClick={() => updateStatusMutation.mutate({ id: selectedInquiry._id, status: 'replied' })}
                  disabled={selectedInquiry.status === 'replied'}
                  className="bg-zinc-800 text-white px-6 py-2 rounded-full font-bold hover:bg-zinc-700 transition-colors text-sm disabled:opacity-50"
                >
                  Mark as Replied
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
