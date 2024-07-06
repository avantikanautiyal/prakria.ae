import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import data_service from "@/data/data_service.json";
import HeroseSection from "@/components/service/herosSection";
import Home1Blog from "@/components/home/blogCard";
import EnquireBtn from "@/components/global/enquirenow";
import { Faq } from "@/components/global/faq";

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
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>
                Igniting Imagination: PRAKRIA&apos;s 3D & CGI Extravaganza
              </h1>
              <p>
                Step into the realm of visual wonders with PRAKRIA&apos;s 3D &
                CGI services. With over two decades of experience, we are the
                architects of virtual worlds, crafting stunning visualizations
                and animations that leave audiences spellbound.
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
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
