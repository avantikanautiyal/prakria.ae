import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SubService from '@/models/SubService';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const isMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || '').trim());

const normalizeSlugForMatch = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const idOrSlug = decodeURIComponent(String(params.id || '')).replace(/^\/+/, '').trim();
    let subService = null;

    if (isMongoObjectId(idOrSlug)) {
      subService = await SubService.findById(idOrSlug);
    }

    if (!subService && idOrSlug) {
      subService = await SubService.findOne({ slug: idOrSlug });
    }

    if (!subService && idOrSlug) {
      subService = await SubService.findOne({
        slug: { $regex: `^${idOrSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
      });
    }

    if (!subService && idOrSlug) {
      const all = await SubService.find({}).lean();
      const wanted = normalizeSlugForMatch(idOrSlug);
      const matched = all.find((item) => normalizeSlugForMatch(item?.slug) === wanted);
      if (matched?._id) {
        subService = await SubService.findById(matched._id);
      }
    }

    if (!subService) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: subService });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
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
  await dbConnect();
  try {
    const deleted = await SubService.deleteOne({ _id: params.id });
    if (!deleted) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
