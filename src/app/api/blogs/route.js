import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { sanitizeBlogPayload } from '@/lib/dates';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  await dbConnect();
  try {
    const blogs = await Blog.find({}).sort({ postDate: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const payload = sanitizeBlogPayload(body);

    if (!payload.postDate) {
      return NextResponse.json(
        { success: false, error: 'Post date is required' },
        { status: 400 }
      );
    }

    const blog = await Blog.create(payload);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
