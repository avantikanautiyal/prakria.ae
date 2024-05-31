import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
function page() {
  const data = data_service["/digital-marketing"];
  console.log(data.content);
  return (
    <div>
      {/* <img src=""/> */}
      <GridMasonry random={false} data={data?.content} />
      <CardsSection data={data?.CardsSection} />

      <div className="px-4 py-6 my-[75px] grid grid-cols-5 gap-4 container">
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
      </div>
    </div>
  );
}

export default page;
