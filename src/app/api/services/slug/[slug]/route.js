import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const includeDrafts =
      searchParams.get('includeDrafts') === 'true' ||
      searchParams.get('includeDrafts') === '1';
    const publishedParam = searchParams.get('published');
    const onlyPublished =
      publishedParam === null
        ? !includeDrafts
        : publishedParam === 'true' || publishedParam === '1';

    const slugToFind = params.slug.startsWith('/') ? params.slug : `/${params.slug}`;
    const slugQuery = {
      $or: [{ slug: params.slug }, { slug: slugToFind }],
    };
    const publishQuery = onlyPublished
      ? { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] }
      : {};
    const service = await Service.findOne(
      onlyPublished ? { $and: [slugQuery, publishQuery] } : slugQuery
    );
    if (!service) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
