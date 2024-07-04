import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

export const metadata = {
  title: {
    absolute:
      "Website Design & Development Services - Crafting Sites that Captivate",
  },
  description:
    "Get ready to witness web development like never before with PRAKRIA. With over 20 years of experience, we breathe life into websites that captivate, engage, and drive results.",
};

function Page() {
  const data = data_service["/web-development"];

  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div class="banner-wrapper">
            <div class="banner-content">
              <h1>Web Wonders: Crafting Sites that Captivate</h1>
              <p>
              Get ready to witness web development like never before with PRAKRIA. With over 20 years of experience, we breathe life into websites that captivate, engage, and drive results. Our team of web wizards combines creativity with functionality, ensuring your site not only looks stunning but also converts visitors into loyal customers.
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
        <GridMasonry random={false} data={data?.content} fill={false} />
      </div>
      <CardsSection data={data?.CardsSection} />
      <HeroseSection data={data?.sub} />
    </div>
  );
}

export default Page;
