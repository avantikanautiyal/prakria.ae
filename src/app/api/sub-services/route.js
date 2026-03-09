import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SubService from '@/models/SubService';
import { getSession, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  await dbConnect();
  try {
    const subServices = await SubService.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: subServices });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  const session = await getSession();
  if (!session) {
    return unauthorizedResponse();
  }

  await dbConnect();
  try {
    const body = await req.json();
    const subService = await SubService.create(body);
    return NextResponse.json({ success: true, data: subService }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
