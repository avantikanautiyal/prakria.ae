import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AiPage from '@/models/AiPage';

const parseBool = (value) => value === 'true' || value === '1';

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const includeDrafts = parseBool(searchParams.get('includeDrafts'));
    const publishedParam = searchParams.get('published');
    const onlyPublished =
      publishedParam === null ? !includeDrafts : parseBool(publishedParam);

    const query = onlyPublished
      ? { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] }
      : {};
    const page = await AiPage.findOne(query).lean();

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const payload = { ...body, slug: 'ai' };

    const page = await AiPage.findOneAndUpdate({ slug: 'ai' }, payload, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  return PUT(req);
}
