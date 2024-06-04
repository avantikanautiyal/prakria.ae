import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

export const metadata = {
  title: {
    absolute:
      "Website Design & Development Services - Crafting Sites that Captivate",
  },
  description:
    "Get ready to witness web development like never before with PRAKRIA. With over 20 years of experience, we breathe life into websites that captivate, engage, and drive results.",
};

function Page() {
  const data = data_service["/web-development"];

  return (
    <div>
      <GridMasonry random={false} data={data?.content} fill={false} />
      <CardsSection data={data?.CardsSection} />
      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
