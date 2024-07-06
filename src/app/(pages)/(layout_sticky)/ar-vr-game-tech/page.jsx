import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import data_service from "@/data/data_service.json";
import HeroseSection from "@/components/service/herosSection";
import Home1Blog from "@/components/home/blogCard";
import EnquireBtn from "@/components/global/enquirenow";
import { Faq } from "@/components/global/faq";
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
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>Immerse Yourself in Creativity & Technology</h1>
              <p>
                Welcome to the future of immersive tech. We blend cutting-edge
                technology with our artistic flair to create mind-blowing AR &
                VR experiences & games that defy imagination and leave the
                audiences spellbound.
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
