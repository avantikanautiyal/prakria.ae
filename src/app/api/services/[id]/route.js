import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { getSession, unauthorizedResponse } from '@/lib/auth';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const service = await Service.findById(params.id);
    if (!service) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: service });
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
    const service = await Service.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!service) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: service });
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
    const deletedService = await Service.deleteOne({ _id: params.id });
    if (!deletedService) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
