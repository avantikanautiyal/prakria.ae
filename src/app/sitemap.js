import portfolio from "@/data/portfolio_new/index";
import data from "@/data/index";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import CaseStudy from "@/models/CaseStudy";
import Service from "@/models/Service";
import AiPage from "@/models/AiPage";
import SubService from "@/models/SubService";
import {
  isValidPublicSlug,
  normalizePublicSlug,
  resolvePostDate,
} from "@/lib/dates";

const baseURL = "https://www.prakria.ae";

/** Top-level static service pages that already exist (not under /services/). */
const STATIC_SERVICE_SLUGS = new Set(
  data
    .getAllServicePaths()
    .map((path) => normalizePublicSlug(path))
    .filter(Boolean)
);

function entry(path, { lastModified, changeFrequency = "monthly", priority = 0.6 } = {}) {
  return {
    url: `${baseURL}${path.startsWith("/") ? path : `/${path}`}`,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap() {
  const portfolioPaths = portfolio.getAllPortfolioPath();
  const portfolioEntries = portfolioPaths
    .filter((path) => isValidPublicSlug(path))
    .map((path) =>
      entry(`/portfolio-item/${normalizePublicSlug(path)}`, {
        changeFrequency: "monthly",
        priority: 0.6,
      })
    );

  const servicePaths = data.getAllServicePaths();
  const serviceEntries = servicePaths
    .filter((path) => isValidPublicSlug(path))
    .map((path) =>
      entry(path, {
        changeFrequency: "monthly",
        priority: 0.8,
      })
    );

  const staticPages = [
    entry("/", { changeFrequency: "always", priority: 1 }),
    entry("/about-us", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/contact-us", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/blogs", { changeFrequency: "weekly", priority: 0.8 }),
    entry("/ai", { changeFrequency: "weekly", priority: 0.8 }),
    entry("/privacy-policy", { changeFrequency: "yearly", priority: 0.3 }),
    entry("/disclaimer", { changeFrequency: "yearly", priority: 0.3 }),
    entry("/terms-conditions", { changeFrequency: "yearly", priority: 0.3 }),
  ];

  let blogEntries = [];
  let caseStudyEntries = [];
  let cmsServiceEntries = [];
  let aiSubServiceEntries = [];

  try {
    await dbConnect();

    const blogs = await Blog.find({ isPublished: true })
      .select("slug postDate createdAt _id")
      .lean();

    blogEntries = blogs
      .map((blog) => {
        const id = String(blog._id || "");
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return null;
        return entry(`/blogs/${id}`, {
          lastModified: resolvePostDate(blog) || new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      })
      .filter(Boolean);

    const caseStudies = await CaseStudy.find({})
      .select("slug updatedAt createdAt")
      .lean();

    caseStudyEntries = caseStudies
      .map((cs) => {
        const slug = normalizePublicSlug(cs.slug);
        if (!isValidPublicSlug(slug)) return null;
        return entry(`/case-study/${slug}`, {
          lastModified: cs.updatedAt || cs.createdAt || new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      })
      .filter(Boolean);

    const services = await Service.find({
      $or: [{ isPublished: true }, { isPublished: { $exists: false } }],
    })
      .select("slug updatedAt createdAt")
      .lean();

    cmsServiceEntries = services
      .map((service) => {
        const slug = normalizePublicSlug(service.slug);
        if (!isValidPublicSlug(slug)) return null;
        // Static top-level pages are the canonical URLs for known services
        if (STATIC_SERVICE_SLUGS.has(slug)) return null;
        return entry(`/services/${slug}`, {
          lastModified: service.updatedAt || service.createdAt || new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      })
      .filter(Boolean);

    const aiPage = await AiPage.findOne({ isPublished: true }).select("updatedAt").lean();
    if (aiPage) {
      // /ai already in staticPages; refresh lastModified if possible
      const aiStatic = staticPages.find((p) => p.url === `${baseURL}/ai`);
      if (aiStatic && aiPage.updatedAt) {
        aiStatic.lastModified = aiPage.updatedAt;
      }
    }

    const subServices = await SubService.find({
      $or: [{ isPublished: true }, { isPublished: { $exists: false } }],
    })
      .select("slug updatedAt createdAt")
      .lean();

    aiSubServiceEntries = subServices
      .map((sub) => {
        const slug = normalizePublicSlug(sub.slug);
        if (!isValidPublicSlug(slug)) return null;
        return entry(`/ai/${slug}`, {
          lastModified: sub.updatedAt || sub.createdAt || new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      })
      .filter(Boolean);
  } catch (error) {
    console.error("sitemap: failed to load dynamic entries", error);
  }

  return [
    ...staticPages,
    ...serviceEntries,
    ...cmsServiceEntries,
    ...portfolioEntries,
    ...blogEntries,
    ...caseStudyEntries,
    ...aiSubServiceEntries,
  ];
}
