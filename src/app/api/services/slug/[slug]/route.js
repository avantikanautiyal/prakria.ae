import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const slugToFind = params.slug.startsWith('/') ? params.slug : `/${params.slug}`;
    const service = await Service.findOne({
      $or: [
        { slug: params.slug },
        { slug: slugToFind }
      ]
    });
    if (!service) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
