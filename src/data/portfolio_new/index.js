import threeDCGI from "./3d-cgi.json";
import arVr from "./ar-vr.json";
import branding from "./branding.json";
import digitalMarketing from "./digitalmarkiting.json";
import packaging from "./packaging.json";
import printMedia from "./printmedia.json";
import website from "./website.json"

const portfolioData = {
  threeDCGI,
  arVr,
  branding,
  digitalMarketing,
  packaging,
  printMedia,
  website
};
// Creates an object with all portfolio item keys as keys and their category as value
function getPortfolioPathObject(path) {
  // Check if the path key exists in any category and return its JSON value if found
  
  for (const category in portfolioData) {
    if (portfolioData[category].hasOwnProperty(path)) {
      return portfolioData[category][path];
    }
  }
  return undefined; // or null, or throw an error, based on your use-case
}

function getAllPortfolioPath() {
  // Live portfolio slugs only (used by sitemap) — includes website work
  const allKeys = [
    ...Object.keys(portfolioData.threeDCGI),
    ...Object.keys(portfolioData.arVr),
    ...Object.keys(portfolioData.branding),
    ...Object.keys(portfolioData.digitalMarketing),
    ...Object.keys(portfolioData.packaging),
    ...Object.keys(portfolioData.printMedia),
    ...Object.keys(portfolioData.website),
  ];
  return allKeys;
}
const portfolioExports = { portfolioData, getPortfolioPathObject, getAllPortfolioPath };
export default portfolioExports;
