import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SubService from '@/models/SubService';
import { cookies } from 'next/headers';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const subService = await SubService.findById(params.id);
    if (!subService) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: subService });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const session = cookies().get('admin_session');
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await req.json();
    const subService = await SubService.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!subService) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: subService });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const session = cookies().get('admin_session');
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const deleted = await SubService.deleteOne({ _id: params.id });
    if (!deleted) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
