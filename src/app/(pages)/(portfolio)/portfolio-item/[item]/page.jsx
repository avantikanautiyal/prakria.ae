// "use client";
import React from "react";
import { notFound } from "next/navigation";
import portfolio_data from "@/data/portfolio.json";
// import GridLayout from "@/components/ui/GridMasonry";
// import MarkDown from "../../markdown";
import PortfolioPage from "@/components/portfolio/portfolioPage";
import  portfolio from "@/data/portfolio_new/index";

export async function generateMetadata({ params }) {
  const { item } = params;
  const data = portfolio_data[item];
  return {
    title: {
      absolute: data?.title,
    },
  };
}

function Page({ params }) {
  const { item } = params;
  console.log("getPortfolioPathObject" ,item)
  const data =portfolio.getPortfolioPathObject(item) ;
  //  getPortfolioPathObject(item);
  // getPortfolioPathObject(item);
  // portfolio_data[item];
  if (!data) notFound();

  console.log("data" , Object.keys(data)) ;
  return (
    <>
      <div className="min-h-screen bg-black text-white">
       <PortfolioPage {...data}/>
      </div>
    </>
  );
}



export default Page;
