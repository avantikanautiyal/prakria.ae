// "use client";
import React from "react";
import { notFound } from "next/navigation";
import portfolio_data from "@/data/portfolio_data";
import GridLayout from "@/components/ui/GridMasonry";
import MarkDown from "../../markdown";

function Page({ params }) {
  const { item } = params;
  const data = portfolio_data[item];
  if (!data) notFound();

  return (
    <div className="border-2 border-black">
      <div className="fixed top-0 left-0   h-[76px] w-[100%] bg-gradient-to-b from-black to-[rgba(0,0,0,0.77)]"></div>
      <div className="sticky top-0 w-[100%] z-[-10] h-[82dvh] overflow-hidden">
        <div>
          <img
            src={data?.bannerImage}
            alt="banner image"
            className="object-cover w-[100%] h-[100dvh]"
          />
        </div>
      </div>
      <div id="main" className="sticky z-10 bg-black p-10  ">
        <div className="container flex flex-col gap-4">
          <div className="p-4">
            <MarkDown content={data.markdown} />
          </div>

          <GridLayout
            random={false}
            data={[
              { src: "/images/3d_cgi.jpg" },
              { src: "/images/3d_cgi.jpg", row: 2 },
              { src: "/images/3d_cgi.jpg", col: 1 },
              { src: "/images/3d_cgi.jpg", col: 1 },
              { src: "/images/3d_cgi.jpg", row: 2 },
            ]}
          />
        </div>
        {/* GRID LAYOUT HERE */}
      </div>
    </div>
  );
}

export default Page;
