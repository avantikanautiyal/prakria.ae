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

const isMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || '').trim());

const extractAiSlug = (value) => {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    try {
      const pathname = new URL(raw).pathname || '';
      const segments = pathname.split('/').filter(Boolean);
      const aiIndex = segments.indexOf('ai');
      if (aiIndex >= 0 && segments[aiIndex + 1]) return segments[aiIndex + 1];
      return segments[segments.length - 1] || null;
    } catch {
      return null;
    }
  }

  if (raw.startsWith('/ai/')) return raw.slice(4);
  if (raw.startsWith('ai/')) return raw.slice(3);
  if (raw.startsWith('/')) {
    const segments = raw.split('/').filter(Boolean);
    if (!segments.length) return null;
    if (segments[0] === 'ai' && segments[1]) return segments[1];
    return segments[segments.length - 1];
  }

  return raw;
};

const toSlugParam = (value) => {
  if (!value) return '';
  const decoded = decodeURIComponent(String(value));
  return decoded.startsWith('/') ? decoded.slice(1) : decoded;
};

const normalizeSlugForMatch = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const buildSlugCandidates = (value) => {
  const raw = toSlugParam(value);
  const cleaned = raw.trim();
  if (!cleaned) return [];

  const variants = [
    cleaned,
    cleaned.toLowerCase(),
    cleaned.replace(/%26/gi, '&'),
    cleaned.replace(/&/g, 'and'),
    cleaned.replace(/&/g, ''),
    cleaned.replace(/-and-/gi, '-'),
    cleaned.replace(/-&-/gi, '-'),
    cleaned.replace(/_/g, '-'),
  ];

  const normalized = normalizeSlugForMatch(cleaned);
  if (normalized) variants.push(normalized);

  return [...new Set(variants.map((item) => item.trim()).filter(Boolean))];
};

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function findSubServiceBySlugParam(slugParam, publishQuery) {
  const cleanSlug = toSlugParam(slugParam);
  const candidates = buildSlugCandidates(cleanSlug);

  if (isMongoObjectId(cleanSlug)) {
    const byIdOrSlug = await SubService.findOne({
      $and: [{ $or: [{ _id: cleanSlug }, { slug: cleanSlug }] }, publishQuery],
    });
    if (byIdOrSlug) return byIdOrSlug;
  }

  if (candidates.length > 0) {
    const exact = await SubService.findOne({
      $and: [{ slug: { $in: candidates } }, publishQuery],
    });
    if (exact) return exact;

    const regex = await SubService.findOne({
      $and: [{ slug: { $in: candidates.map((item) => new RegExp(`^${escapeRegex(item)}$`, 'i')) } }, publishQuery],
    });
    if (regex) return regex;
  }

  const allPublished = await SubService.find(publishQuery).lean();
  const wanted = normalizeSlugForMatch(cleanSlug);
  if (!wanted) return null;

  return (
    allPublished.find((service) => normalizeSlugForMatch(service?.slug) === wanted) ||
    null
  );
}

const resolveRelatedServiceHref = (item, slugById, slugByTitle) => {
  const slugCandidates = [item?.slug, item?.buttonLink, item?._id];

  for (const candidate of slugCandidates) {
    const extracted = extractAiSlug(candidate);
    if (!extracted) continue;

    if (isMongoObjectId(extracted)) {
      const slugFromId = slugById.get(extracted);
      if (slugFromId) return `/ai/${slugFromId}`;
      continue;
    }

    return `/ai/${extracted}`;
  }

  const titleKey = String(item?.title || '').trim().toLowerCase();
  if (titleKey && slugByTitle.has(titleKey)) {
    return `/ai/${slugByTitle.get(titleKey)}`;
  }

  if (item?.buttonLink && (String(item.buttonLink).startsWith('/') || String(item.buttonLink).startsWith('http'))) {
    return item.buttonLink;
  }

  return '#';
};

export async function generateMetadata({ params }) {
  await dbConnect();
  const publishQuery = { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] };
  const subService = await findSubServiceBySlugParam(params.slug, publishQuery);

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
  const data = await findSubServiceBySlugParam(params.slug, publishQuery);

  if (!data) {
    notFound();
  }

  const allPublishedSubServices = await SubService.find(publishQuery).select('_id slug name').lean();
  const slugById = new Map();
  const slugByTitle = new Map();
  allPublishedSubServices.forEach((service) => {
    if (!service?.slug) return;
    if (service?._id) slugById.set(String(service._id), service.slug);
    if (service?.name) slugByTitle.set(String(service.name).trim().toLowerCase(), service.slug);
  });

  // Convert Mongoose doc to plain object for client components if needed, 
  // though here we are in a Server Component.
  const subService = JSON.parse(JSON.stringify(data));
  const relatedServicesList = (subService.relatedServicesSection?.list || []).map((item) => ({
    ...item,
    href: resolveRelatedServiceHref(item, slugById, slugByTitle),
  }));

  return (
    <main className="bg-black min-h-screen text-white overflow-hidden">
      {/* 1. Hero Section - Usually required */}
      {(subService.herosection?.title || subService.name) && (
        <div className="relative w-full">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-3/4 h-3/4 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent" />
          
          <SubServiceHero
            subtitle={subService.category || "AI Creative Production"}
            title={subService.herosection?.title || subService.name}
            description={subService.herosection?.description}
            buttonText={subService.herosection?.buttonText}
            buttonLink="/contact-us"
            image={subService.herosection?.icon}
          />
        </div>
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
          list={relatedServicesList}
          conclusionLine={subService.relatedServicesSection?.conclusionLine}
        />
      )}
    </main>
  );
}
