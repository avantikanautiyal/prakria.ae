import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import Service from '@/models/Service';

const baseURL = 'https://www.prakria.com';

const toDate = (value) => {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const normalizeDynamicSlug = (slug, routePrefix) => {
  if (!slug || typeof slug !== 'string') return null;

  let clean = slug.trim();
  if (!clean) return null;

  if (clean.startsWith('http://') || clean.startsWith('https://')) return null;

  clean = clean.split('?')[0].split('#')[0];
  clean = clean.replace(/^\/+|\/+$/g, '');

  const lowerPrefix = routePrefix.toLowerCase();
  const lowerClean = clean.toLowerCase();

  if (lowerClean.startsWith(`${lowerPrefix}/`)) {
    clean = clean.slice(routePrefix.length + 1);
  } else if (lowerClean === lowerPrefix) {
    return null;
  }

  return clean || null;
};

const buildEntries = (records, routePrefix) => {
  const uniqueEntries = new Map();

  records.forEach((record) => {
    const normalizedSlug = normalizeDynamicSlug(record?.slug, routePrefix);
    if (!normalizedSlug) return;

    const url = `${baseURL}/${routePrefix}/${normalizedSlug}`;
    const lastModified = toDate(record?.updatedAt || record?.createdAt);
    uniqueEntries.set(url, { url, lastModified });
  });

  return Array.from(uniqueEntries.values());
};

const staticpages = [
  { url: `${baseURL}`, lastModified: new Date() },
  { url: `${baseURL}/contact-us`, lastModified: new Date() },
  { url: `${baseURL}/privacy-policy`, lastModified: new Date() },
  { url: `${baseURL}/disclaimer`, lastModified: new Date() },
  { url: `${baseURL}/about-us`, lastModified: new Date() },
];

export default async function sitemap() {
  try {
    await dbConnect();

    const [caseStudies, services] = await Promise.all([
      CaseStudy.find({}, { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 }).lean(),
      Service.find(
        { $or: [{ isPublished: true }, { isPublished: { $exists: false } }] },
        { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 }
      ).lean(),
    ]);

    const caseStudyEntries = buildEntries(caseStudies, 'case-study');
    const serviceEntries = buildEntries(services, 'services');

    return [...staticpages, ...caseStudyEntries, ...serviceEntries];
  } catch (error) {
    console.error('Sitemap dynamic generation failed:', error);
    return staticpages;
  }
}
