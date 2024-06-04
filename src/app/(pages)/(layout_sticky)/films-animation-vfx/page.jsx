import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

export const metadata = {
  title: {
    absolute:
      "Films, Animation &amp; VFX - Lights, camera, and action - at PRAKRIA",
  },
  description:
    "We bring your visions to life through our comprehensive Films Animation and VFX services. From scriptwriting and storyboarding to final production, post-production, 3D &amp; 2D animation along with cutting-edge CGI",
};

function Page() {
  const data = data_service["/films-animation-vfx"];

  return (
    <div>
      <GridMasonry random={false} data={data?.content} />
      {/* <CardsSection data={data?.CardsSection} /> */}
      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
