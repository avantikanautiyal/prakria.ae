import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SubService from '@/models/SubService';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const includeDrafts =
      searchParams.get('includeDrafts') === 'true' ||
      searchParams.get('includeDrafts') === '1';
    const publishedParam = searchParams.get('published');
    const onlyPublished =
      publishedParam === null
        ? !includeDrafts
        : publishedParam === 'true' || publishedParam === '1';

    const query = onlyPublished
      ? { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] }
      : {};
    const subServices = await SubService.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: subServices });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const subService = await SubService.create(body);
    return NextResponse.json({ success: true, data: subService }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
