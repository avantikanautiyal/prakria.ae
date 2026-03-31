import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

const normalizeOrderNumber = (value) => {
  if (value === '' || value === null || typeof value === 'undefined') return null;
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
};

export async function GET(req) {
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

    const matchStage = onlyPublished
      ? { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] }
      : {};

    const services = await Service.aggregate([
      { $match: matchStage },
      {
        $addFields: {
          orderSort: {
            $convert: {
              input: '$orderNumber',
              to: 'double',
              onError: 1000000000000,
              onNull: 1000000000000,
            },
          },
        },
      },
      { $sort: { orderSort: 1, createdAt: -1 } },
      { $project: { orderSort: 0 } },
    ]);
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    body.orderNumber = normalizeOrderNumber(body.orderNumber);
    const service = await Service.create(body);
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
