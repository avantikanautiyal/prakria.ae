import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { sanitizeBlogPayload } from '@/lib/dates';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    let blog;
    if (params.id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(params.id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: params.id });
    }
    if (!blog) return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const payload = sanitizeBlogPayload(body);

    if (Object.prototype.hasOwnProperty.call(body, 'postDate') && !payload.postDate) {
      return NextResponse.json(
        { success: false, error: 'Post date is required' },
        { status: 400 }
      );
    }

    const blog = await Blog.findByIdAndUpdate(params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!blog) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deletedBlog = await Blog.deleteOne({ _id: params.id });
    if (!deletedBlog) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
