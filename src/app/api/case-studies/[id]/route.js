import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import { getSession, unauthorizedResponse } from '@/lib/auth';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const caseStudy = await CaseStudy.findById(params.id);
    if (!caseStudy) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: caseStudy });
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
    const caseStudy = await CaseStudy.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!caseStudy) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: caseStudy });
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
    const deleted = await CaseStudy.deleteOne({ _id: params.id });
    if (!deleted) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
