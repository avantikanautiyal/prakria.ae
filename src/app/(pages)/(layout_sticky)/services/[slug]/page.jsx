import { notFound } from 'next/navigation';
import Servicepage from '@/components/service/Servicepage';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

// Map DB model data to the prop-shape expected by Servicepage sub-components
function mapServiceToProps(service) {
  return {
    heroSection: {
      title: service.herosection?.title,
      description: service.herosection?.description,
      buttonText: service.herosection?.buttonText,
      buttonLink: service.herosection?.buttonLink,
      conclusionLine: service.herosection?.conclusionLine,
    },
    ourWork: {
      title: service.workSection?.title,
      description: service.workSection?.description,
      buttonText: service.workSection?.buttonText,
      buttonLink: service.workSection?.buttonLink,
      conclusionLine: service.workSection?.conclusionLine,
      list: (service.workSection?.list || []).map((item) => ({
        src: item.url,
        alt: item.alt || item.title || '',
        link: item.slug ? `/case-study/${item.slug}` : null,
        type: item.mediaType === 'video' ? 'video' : 'image',
        poster: null,
      })),
    },
    why: {
      title: service.whyChooseSection?.title,
      description: service.whyChooseSection?.description,
      conclusionLine: service.whyChooseSection?.conclusionLine,
      list: (service.whyChooseSection?.list || []).map((item) => ({
        src: item.icon,
        title: item.title,
        description: item.description,
      })),
    },
    ourCore: {
      title: service.coreServicesSection?.title,
      description: service.coreServicesSection?.description,
      conclusionLine: service.coreServicesSection?.conclusionLine,
      list: (service.coreServicesSection?.list || []).map((item, index) => ({
        id: item.tabTitle?.toLowerCase().replace(/\s+/g, '-') || `tab-${index}`,
        name: item.tabTitle,
        title: item.contentTitle,
        description: item.description,
        focusAreas: item.focusList || [],
        focusAreaTitle: null,
        closingNote: item.bottomBox,
        icon: item.icon,
      })),
    },
    howWork: {
      title: service.howWeWorkSection?.title,
      description: service.howWeWorkSection?.description,
      conclusionLine: service.howWeWorkSection?.conclusionLine,
      list: (service.howWeWorkSection?.list || []).map((item) => ({
        count: item.number,
        title: item.title,
        description: item.description,
      })),
    },
    benifits: {
      title: service.benefitsSection?.title,
      description: service.benefitsSection?.description,
      conclusionLine: service.benefitsSection?.conclusionLine,
      list: (service.benefitsSection?.list || []).map((item) => ({
        src: item.icon,
        title: item.title,
        description: item.title, // fallback if no separate description
      })),
    },
    faq: {
      title: service.faqSection?.title,
      description: service.faqSection?.description,
      conclusionLine: service.faqSection?.conclusionLine,
      list: (service.faqSection?.list || []).map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    },
  };
}

export async function generateMetadata({ params }) {
  await dbConnect();
  const slugToFind = params.slug.startsWith('/') ? params.slug : `/${params.slug}`;
  const slugQuery = {
    $or: [{ slug: params.slug }, { slug: slugToFind }],
  };
  const publishQuery = {
    $or: [{ isPublished: true }, { isPublished: { $exists: false } }],
  };
  const service = await Service.findOne({ $and: [slugQuery, publishQuery] }).lean();
  
  if (!service) return {};

  return {
    title: {
      absolute: service.metaTitle || service.name,
    },
    description: service.metaDescription || '',
    keywords: service.metaKeywords || '',
  };
}

export default async function ServiceDynamicPage({ params }) {
  await dbConnect();
  const slugToFind = params.slug.startsWith('/') ? params.slug : `/${params.slug}`;
  const slugQuery = {
    $or: [{ slug: params.slug }, { slug: slugToFind }],
  };
  const publishQuery = {
    $or: [{ isPublished: true }, { isPublished: { $exists: false } }],
  };
  const service = await Service.findOne({ $and: [slugQuery, publishQuery] }).lean();

  if (!service) {
    notFound();
  }

  const props = mapServiceToProps(service);

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <div className="space-y-[48px] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Servicepage {...props} />
      </div>
    </div>
  );
}
