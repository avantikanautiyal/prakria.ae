import portfolio from "./portfolio.json";
import navData from "./navData.json";

const portfolioData = portfolio;

// Creates an object with all portfolio item keys as keys and their category as value
function getPortfolioPathObject(path) {
  return portfolio[path];
}

function getAllPortfolioPath() {
  return Object.keys(portfolio);
}

function getAllServicePaths() {
  const serviceItem = navData.find(item => item.label === "WHAT WE DO");
  if (serviceItem && serviceItem.subMenu) {
    return serviceItem.subMenu.map(sub => sub.link);
  }
  return [];
}

export default { 
  portfolioData, 
  getPortfolioPathObject, 
  getAllPortfolioPath,
  getAllServicePaths 
};
