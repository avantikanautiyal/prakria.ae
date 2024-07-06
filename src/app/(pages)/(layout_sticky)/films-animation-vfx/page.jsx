import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import data_service from "@/data/data_service.json";
import HeroseSection from "@/components/service/herosSection";
import Home1Blog from "@/components/home/blogCard";
import EnquireBtn from "@/components/global/enquirenow";
import { Faq } from "@/components/global/faq";

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
      <div className="service-page-hero">
        <div className="container text-center">
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>Lights, camera, and action - at PRAKRIA</h1>
              <p>
                Welcome to the realm of cinematic wonders, where PRAKRIA weaves
                storytelling magic into every frame. We bring your visions to
                life through our comprehensive filmmaking services. From
                scriptwriting and storyboarding to final production,
                post-production, 3D & 2D animation along with cutting-edge CGI,
                we handle just about everything in the journey of films,
                end-to-end, all under one roof.
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <GridMasonry random={false} data={data?.content} />
      </div>

      {/* <CardsSection data={data?.CardsSection} /> */}
      <HeroseSection data={data?.sub} />
      <Home1Blog />
      <Faq data={data?.faq} />
    </div>
  );
}

export default Page;
