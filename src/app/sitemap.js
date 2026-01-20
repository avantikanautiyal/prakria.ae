import data from "@/data/index";

const baseURL = "https://www.prakria.com";

export default async function sitemap() {
  // Get all portfolio paths
  const portfolioPaths = data.getAllPortfolioPath();
  const portfolioEntries = portfolioPaths.map((path) => ({
    url: `${baseURL}/portfolio-item/${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Get all service paths
  const servicePaths = data.getAllServicePaths();
  const serviceEntries = servicePaths.map((path) => ({
    url: `${baseURL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseURL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseURL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseURL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseURL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseURL}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticPages, ...serviceEntries, ...portfolioEntries];
}
