import CardsSection from "@/components/service/CardsSection";
import React from "react";
import data_service from "@/data/data_service.json";
import GridMasonry from "@/components/ui/GridMasonry";

export const metadata = {
  title: {
    absolute: "Product packaging Design Company - Designs That Stands Out",
  },
  description:
    "Step into a world where packaging design goes beyond functionality and becomes a true reflection of your brand&#039;s essence",
};

function Page() {
  const data = data_service["/packaging-design"];

  return (
    <div>
      <div className="px-4">
        <GridMasonry random={false} data={data?.content} />
      </div>
      <CardsSection data={data?.cardsSection} />
    </div>
  );
}

export default Page;
