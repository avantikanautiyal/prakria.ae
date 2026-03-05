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

export async function generateMetadata({ params }) {
  await dbConnect();
  const subService = await SubService.findOne({ slug: params.slug });

  if (!subService) return {};

  return {
    title: subService.metaTitle || `${subService.name} | PRAKRIA TECH`,
    description: subService.metaDescription,
    keywords: subService.metaKeywords,
  };
}

export default async function SubServicePage({ params }) {
  await dbConnect();
  const data = await SubService.findOne({ _id: params.slug });

  if (!data) {
    notFound();
  }

  // Convert Mongoose doc to plain object for client components if needed, 
  // though here we are in a Server Component.
  const subService = JSON.parse(JSON.stringify(data));

  return (
    <main className="bg-black min-h-screen text-white overflow-hidden pb-20">
      {/* 1. Hero Section */}
      <SubServiceHero 
        subtitle={subService.category || "AI Creative Production"}
        title={subService.herosection?.title || subService.name}
        description={subService.herosection?.description}
        buttonText={subService.herosection?.buttonText}
        buttonLink="/contact-us"
      />

      {/* 2. Intro Section */}
      <SubServiceIntro 
        title={subService.introSection?.title}
        description={subService.introSection?.description}
      />

      {/* 3. Services Grid */}
      <SubServiceListGrid 
        title={subService.servicesSection?.title}
        subtitle={subService.servicesSection?.subtitle}
        list={subService.servicesSection?.list}
        conclusionLine={subService.servicesSection?.conclusionLine}
      />

      {/* 4. Why Choose / Numbered Cards */}
      <SubServiceNumberedCards 
        title={subService.whyChooseSection?.title}
        description={subService.whyChooseSection?.description}
        list={subService.whyChooseSection?.list}
        conclusionLine={subService.whyChooseSection?.conclusionLine}
      />

      {/* 5. Expertise Section (Using ListGrid for consistency) */}
      <SubServiceListGrid 
        title={subService.expertiseSection?.title}
        list={subService.expertiseSection?.list}
        conclusionLine={subService.expertiseSection?.conclusionLine}
      />

      {/* 6. Platforms Section */}
      <SubServicePlatforms 
        title={subService.platformsSection?.title}
        description={subService.platformsSection?.description}
        list={subService.platformsSection?.list}
        conclusionLine={subService.platformsSection?.conclusionLine}
      />

      {/* 7. Differentiators (Using ListGrid) */}
      <SubServiceListGrid 
        title={subService.differentiatorsSection?.title}
        list={subService.differentiatorsSection?.list}
        conclusionLine={subService.differentiatorsSection?.conclusionLine}
      />

      {/* 8. Use Cases Grid */}
      <SubServiceUseCases 
        title={subService.useCasesSection?.title}
        description={subService.useCasesSection?.description}
        list={subService.useCasesSection?.list}
        conclusionLine={subService.useCasesSection?.conclusionLine}
      />

      {/* 9. Related Services */}
      <SubServiceRelated 
        title={subService.relatedServicesSection?.title}
        list={subService.relatedServicesSection?.list}
        conclusionLine={subService.relatedServicesSection?.conclusionLine}
      />
    </main>
  );
}
