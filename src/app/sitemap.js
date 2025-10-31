// TODO to be updated
// import portfolioPage from "@/data/portfolio.json";
import portfolioData from "@/data/portfolio_new/index";

const baseURL = "https://www.prakria.com";
export default async function sitemap() {
  const path_list = portfolioData.getAllPortfolioPath();
  const portfolio = path_list.map((p) => {
    return { url: `${baseURL}/portfolio-item/${p}`, lastModified: new Date() };
  });

  const staticpages = [
    {
      url: `${baseURL}`,
      lastModified: "",
    },
    {
      url: `${baseURL}/contact-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/disclaimer`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/about-us`,
      lastModified: new Date(),
    },

    {
      url: `${baseURL}/digital-marketing`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/packaging-design`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/branding`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/print-media`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/3d-cgi`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/ar-vr-game-tech`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/films-animation-vfx`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/illustration`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/web-development`,
      lastModified: new Date(),
    },
  ];

  return [...staticpages, ...portfolio];
}
