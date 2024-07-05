import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import data_service from "@/data/data_service.json";
import HeroseSection from "@/components/service/herosSection";
import Home1Blog from "@/components/home/blogCard";
import EnquireBtn from "@/components/global/enquirenow";

export const metadata = {
  title: {
    absolute: "Illustration Agency in India- PRAKRIA&#039;s Artistic Ingenuity",
  },
  description:
    "PRAKRIA India's leading international illustration agency with over two decades of experience, our illustrators have honed their crafty brushstrokes, transforming concepts into mesmerizing visual tales.",
};

function Page() {
  const data = data_service["/illustration"];

  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>Illustrate to Impress: PRAKRIA&apos;s Artistic Ingenuity</h1>
              <p>
                Welcome to the realm of boundless creativity, where
                PRAKRIA&apos;s illustrators work their magic to unlock the
                UNIMAGINABLE. With over two decades of experience, our
                illustrators have honed their crafty brushstrokes, transforming
                concepts into mesmerizing visual tales.
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
    </div>
  );
}

export default Page;
