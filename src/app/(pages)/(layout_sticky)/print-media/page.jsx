import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

export const metadata = {
  title: {
    absolute: "Print Media - Leading Print Media Agency in India",
  },
  description:
    "Serving top global brands like Nestle, Pernod Ricard, Burger King, Kohler and many more, we bring our FMCG expertise to deliver print solutions that captivate and convert.",
};

function Page() {
  const data = data_service["/print-media"];

  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div class="banner-wrapper">
            <div class="banner-content">
              <h1>Print Perfection: Elevate Your Brand Presence</h1>
              <p>
              Unveil the brilliance of our 20+ year journey, crafting Print Masterpieces that redefine brand storytelling. We understand that Print remains a powerful tool for brand recognition and have honed our skills to create designs that make a difference. Serving top global brands like Nestle, Pernod Ricard, Burger King, Kohler and many more, we bring our FMCG expertise to deliver print solutions that captivate and convert.
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
      <GridMasonry random={false} data={data?.content} />
      {/* <CardsSection data={data?.CardsSection} /> */}
      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
