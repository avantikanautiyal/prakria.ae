import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";
export const metadata = {
  title: {
    absolute: "AR, VR & Game Tech - Best Game Development Agency in Delhi",
  },
  description:
    "We blend cutting-edge technology with our artistic flair to create mind-blowing AR & VR experiences & games that defy imagination leave the audiences spellbound.",
};
function Page() {
  const data = data_service["/ar-vr-game-tech"];

  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div class="banner-wrapper">
            <div class="banner-content">
              <h1>
              Immerse Yourself in Creativity & Technology
              </h1>
              <p>
              Welcome to the future of immersive tech. We blend cutting-edge technology with our artistic flair to create mind-blowing AR & VR experiences & games that defy imagination and leave the audiences spellbound.
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
