import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const testimonial = await Testimonial.findById(params.id);
    if (!testimonial) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deletedTestimonial = await Testimonial.deleteOne({ _id: params.id });
    if (!deletedTestimonial) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
