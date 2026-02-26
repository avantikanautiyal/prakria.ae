export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-zinc-400">Welcome to the Prakria Admin Panel. Use the sidebar to manage Blogs and Testimonials.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Blogs</h2>
          <p className="text-zinc-400 mb-4">Manage your blog posts, create new ones, or edit existing ones.</p>
          <a href="/admin/blogs" className="text-white font-bold hover:underline">Manage Blogs →</a>
        </div>
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Testimonials</h2>
          <p className="text-zinc-400 mb-4">Manage customer testimonials and feedback.</p>
          <a href="/admin/testimonials" className="text-white font-bold hover:underline">Manage Testimonials →</a>
        </div>
      </div>
    </div>
  );
}
