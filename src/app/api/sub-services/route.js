import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SubService from '@/models/SubService';
import { cookies } from 'next/headers';

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
  const session = cookies().get('admin_session');
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
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
