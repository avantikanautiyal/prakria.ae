import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req) {
  await dbConnect();
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const inquiry = await Inquiry.create(body);
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PATCH to update status (e.g. mark as read)
export async function PATCH(req) {
  await dbConnect();
  try {
    const { id, status } = await req.json();
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!inquiry) return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
