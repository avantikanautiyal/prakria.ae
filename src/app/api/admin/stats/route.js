import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import CaseStudy from '@/models/CaseStudy';
import Inquiry from '@/models/Inquiry';
import Service from '@/models/Service';
import SubService from '@/models/SubService';
import Testimonial from '@/models/Testimonial';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  await dbConnect();

  try {
    const [blogs, caseStudies, inquiries, services, subServices, testimonials] = await Promise.all([
      Blog.countDocuments(),
      CaseStudy.countDocuments(),
      Inquiry.countDocuments(),
      Service.countDocuments(),
      SubService.countDocuments(),
      Testimonial.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        blogs,
        caseStudies,
        inquiries,
        services,
        subServices,
        testimonials,
      }
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
