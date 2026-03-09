import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getSession, unauthorizedResponse } from '@/lib/auth';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    let blog;
    // Check if params.id is a valid MongoDB ObjectId
    if (params.id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(params.id);
    }

    // If not found by ID, try searching by slug
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
  const session = await getSession();
  if (!session) {
    return unauthorizedResponse();
  }

  await dbConnect();
  try {
    const body = await req.json();
    const blog = await Blog.findByIdAndUpdate(params.id, body, {
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
  const session = await getSession();
  if (!session) {
    return unauthorizedResponse();
  }

  await dbConnect();
  try {
    const deletedBlog = await Blog.deleteOne({ _id: params.id });
    if (!deletedBlog) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
