import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HomePageSection from '@/models/HomePageSection';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const activeParam = searchParams.get('active');
    const onlyActive = activeParam === 'true' || activeParam === '1';

    const query = onlyActive ? { isActive: true } : {};
    const sections = await HomePageSection.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: sections });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const section = await HomePageSection.create(body);
    return NextResponse.json({ success: true, data: section }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
