import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HomePageSection from '@/models/HomePageSection';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const section = await HomePageSection.findById(params.id);
    if (!section) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: section });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const section = await HomePageSection.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!section) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: section });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deleted = await HomePageSection.deleteOne({ _id: params.id });
    if (!deleted) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
