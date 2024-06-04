import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

export const metadata = {
  title: {
    absolute: "Print Media - Leading Print Media Agency in India",
  },
  description:
    "Serving top global brands like Nestle, Pernod Ricard, Burger King, Kohler and many more, we bring our FMCG expertise to deliver print solutions that captivate and convert.",
};

function Page() {
  const data = data_service["/print-media"];

  return (
    <div>
      <GridMasonry random={false} data={data?.content} />
      {/* <CardsSection data={data?.CardsSection} /> */}
      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
