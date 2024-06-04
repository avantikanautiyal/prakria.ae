import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

// export async function generateMetadata() {
//   return {
//     title: "PRAKRIA",
//   };
// }
export const metadata = {
  title: {
    absolute:
      "Branding - Best Creative &amp; Packaging Designing Company | PRAKRIA.COM |",
  },
  description:
    "Brand Identity Redefined: PRAKRIA's Distinctive Touch In today's fast-paced world, building a brand is indispensable for making your mark and standing out in the crowd. At PRAKRIA, we have the experience and expertise to transform your brand from a mere idea to an influential force that leaves a lasting impression.",
};
function Page() {
  const data = data_service["/branding"];

  return (
    <div>
      <GridMasonry random={false} data={data?.content} />
      <CardsSection data={data?.CardsSection} />

      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
