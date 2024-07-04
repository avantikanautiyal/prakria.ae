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
      <div className="service-page-hero">
        <div className="container text-center">
          <div class="banner-wrapper">
            <div class="banner-content">
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
              <button
                class="primary-btn2 capitalize"
                type="submit"
                data-text="Enquire Now"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <GridMasonry random={false} data={data?.content} />
      </div>

      {/* <CardsSection data={data?.CardsSection} /> */}
      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
