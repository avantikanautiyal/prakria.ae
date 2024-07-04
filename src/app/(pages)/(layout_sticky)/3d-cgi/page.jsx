import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";

export const metadata = {
  title: {
    absolute: "3D &amp; CGI - Best 3D &amp; CGI Company in Delhi",
  },
};
function Page() {
  const data = data_service["/3d-cgi"];

  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div class="banner-wrapper">
            <div class="banner-content">
              <h1>
              Igniting Imagination: PRAKRIA&apos;s 3D & CGI Extravaganza
              </h1>
              <p>
              Step into the realm of visual wonders with PRAKRIA&apos;s 3D & CGI services. With over two decades of experience, we are the architects of virtual worlds, crafting stunning visualizations and animations that leave audiences spellbound.
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
