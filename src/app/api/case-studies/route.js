import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  await dbConnect();
  try {
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: caseStudies });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const caseStudy = await CaseStudy.create(body);
    return NextResponse.json({ success: true, data: caseStudy }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
