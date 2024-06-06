import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";
export const metadata = {
  title: {
    absolute: "Digital Marketing - Lead the Era of DIGITAL DOMINATION",
  },
  description:
    "In the era that’s growing more &amp; more digital by the day, lead the way with PRAKRIA’s 20+ years of expertise in the creative industry.",
};
function Page() {
  const data = data_service["/digital-marketing"];
  return (
    <div>
      {/* <img src=""/> */}
      <div className="px-4">
        <GridMasonry random={false} data={data?.content} />
      </div>
      <CardsSection data={data?.CardsSection} />

      <HeroseSection data={data?.sub} />

      {/* <div className="px-4 py-6 my-[75px] grid grid-cols-5 gap-4 container">
        <div className="col-span-2 flex justify-center items-center wow animate fadeInUp">
          <h1 className="uppercase text-2xl font-bold text-balance">
            {data?.sub?.title}
          </h1>
        </div>
        <div className="col-span-3">
          <p className="text-sm wow animate fadeInUp">
            {data?.sub?.description}
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default Page;
