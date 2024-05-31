import CardsSection from "@/components/service/CardsSection";
import React from "react";
import data_service from "@/data/data_service.json";
import GridMasonry from "@/components/ui/GridMasonry";

function Page() {
  const data = data_service["/packaging-design"];

  console.log(data);

  return (
    <div>
      <GridMasonry random={false} data={data?.content} />
      <CardsSection data={data?.cardsSection} />
    </div>
  );
}

export default Page;
