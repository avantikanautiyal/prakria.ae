import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

export const metadata = {
  title: {
    absolute: "Illustration Agency in India- PRAKRIA&#039;s Artistic Ingenuity",
  },
  description:
    "PRAKRIA India's leading international illustration agency with over two decades of experience, our illustrators have honed their crafty brushstrokes, transforming concepts into mesmerizing visual tales.",
};

function Page() {
  const data = data_service["/illustration"];

  return (
    <div>
      <div className="px-4">
        <GridMasonry random={false} data={data?.content} />
      </div>

      {/* <CardsSection data={data?.CardsSection} /> */}
      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
