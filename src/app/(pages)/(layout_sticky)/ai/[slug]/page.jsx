import dbConnect from '@/lib/mongodb';
import SubService from '@/models/SubService';
import { notFound } from 'next/navigation';
import SubServiceHero from '@/components/service/sub-service/SubServiceHero';
import SubServiceIntro from '@/components/service/sub-service/SubServiceIntro';
import SubServiceListGrid from '@/components/service/sub-service/SubServiceListGrid';
import SubServiceNumberedCards from '@/components/service/sub-service/SubServiceNumberedCards';
import SubServicePlatforms from '@/components/service/sub-service/SubServicePlatforms';
import SubServiceUseCases from '@/components/service/sub-service/SubServiceUseCases';
import SubServiceRelated from '@/components/service/sub-service/SubServiceRelated';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  await dbConnect();
  const publishQuery = { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] };
  const subService = await SubService.findOne({ $and: [{ _id: params.slug }, publishQuery] });

  if (!subService) return {};

  return {
    title: subService.metaTitle || `${subService.name} | PRAKRIA TECH`,
    description: subService.metaDescription,
    keywords: subService.metaKeywords,
  };
}

export default async function SubServicePage({ params }) {
  await dbConnect();
  const publishQuery = { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] };
  const data = await SubService.findOne({ $and: [{ _id: params.slug }, publishQuery] });

  if (!data) {
    notFound();
  }

  // Convert Mongoose doc to plain object for client components if needed, 
  // though here we are in a Server Component.
  const subService = JSON.parse(JSON.stringify(data));

  return (
    <main className="bg-black min-h-screen text-white overflow-hidden">
      {/* 1. Hero Section - Usually required */}
      {(subService.herosection?.title || subService.name) && (
        <SubServiceHero
          subtitle={subService.category || "AI Creative Production"}
          title={subService.herosection?.title || subService.name}
          description={subService.herosection?.description}
          buttonText={subService.herosection?.buttonText}
          buttonLink="/contact-us"
          image={subService.herosection?.icon}
        />
      )}

      {/* 2. Intro Section */}
      {(subService.introSection?.title || subService.introSection?.description) && (
        <SubServiceIntro
          title={subService.introSection?.title}
          description={subService.introSection?.description}
        />
      )}

      {/* 3. Services Grid */}
      {(subService.servicesSection?.title || subService.servicesSection?.list?.length > 0) && (
        <SubServiceListGrid
          title={subService.servicesSection?.title}
          subtitle={subService.servicesSection?.subtitle}
          list={subService.servicesSection?.list}
          conclusionLine={subService.servicesSection?.conclusionLine}
        />
      )}

      {/* 4. Why Choose / Numbered Cards */}
      {(subService.whyChooseSection?.title || subService.whyChooseSection?.list?.length > 0) && (
        <SubServiceNumberedCards
          title={subService.whyChooseSection?.title}
          description={subService.whyChooseSection?.description}
          list={subService.whyChooseSection?.list}
          conclusionLine={subService.whyChooseSection?.conclusionLine}
        />
      )}

      {/* 5. Expertise Section (Using ListGrid for consistency) */}
      {(subService.expertiseSection?.title || subService.expertiseSection?.list?.length > 0) && (
        <SubServiceListGrid
          title={subService.expertiseSection?.title}
          list={subService.expertiseSection?.list}
          conclusionLine={subService.expertiseSection?.conclusionLine}
          showCheckmark={false}
        />
      )}

      {/* 6. Platforms Section */}
      {(subService.platformsSection?.title || subService.platformsSection?.list?.length > 0) && (
        <SubServicePlatforms
          title={subService.platformsSection?.title}
          description={subService.platformsSection?.description}
          list={subService.platformsSection?.list}
          conclusionLine={subService.platformsSection?.conclusionLine}
        />
      )}

      {/* 7. Differentiators (Using ListGrid) */}
      {(subService.differentiatorsSection?.title || subService.differentiatorsSection?.list?.length > 0) && (
        <SubServiceListGrid
          title={subService.differentiatorsSection?.title}
          list={subService.differentiatorsSection?.list}
          conclusionLine={subService.differentiatorsSection?.conclusionLine}
          showCheckmark={false}
        />
      )}

      {/* 8. Use Cases Grid */}
      {(subService.useCasesSection?.title || subService.useCasesSection?.list?.length > 0) && (
        <SubServiceUseCases
          title={subService.useCasesSection?.title}
          description={subService.useCasesSection?.description}
          list={subService.useCasesSection?.list}
          conclusionLine={subService.useCasesSection?.conclusionLine}
        />
      )}

      {/* 9. Related Services */}
      {(subService.relatedServicesSection?.title || subService.relatedServicesSection?.list?.length > 0) && (
        <SubServiceRelated
          title={subService.relatedServicesSection?.title}
          list={subService.relatedServicesSection?.list}
          conclusionLine={subService.relatedServicesSection?.conclusionLine}
        />
      )}
    </main>
  );
}
