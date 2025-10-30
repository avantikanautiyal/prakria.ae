

// TODO to be updated
import portfolioPage from "@/data/portfolio.json";

const baseURL = "https://www.prakria.com"
export default async function sitemap() {

const portfolioPages = Object.keys(portfolioPage);

const portfolio = portfolioPages.map(p=> {
    return {url : `${baseURL}/portfolio-item/${p}` , lastModified : new Date()}
} )
 
  const staticpages = [
    {
      url: `${baseURL}/blog`,
      lastModified  : ""
    },
    {
      url: `${baseURL}/contact`,
    },
    {
      url: `${baseURL}/privacy-policy`,
    },
    {
      url: `${baseURL}/term-condition`,
    },
    {
      url: `${baseURL}/refund`,
    },
  ];

  return [...portfolio];
}
