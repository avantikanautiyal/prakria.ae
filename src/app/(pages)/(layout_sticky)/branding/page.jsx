import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";
import Home1Blog from "@/components/home/blogCard";
import EnquireBtn from "@/components/global/enquirenow";
import { Faq } from "@/components/global/faq";

// export async function generateMetadata() {
//   return {
//     title: "PRAKRIA",
//   };
// }
export const metadata = {
  title: {
    absolute:
      "Branding - Best Creative &amp; Packaging Designing Company | PRAKRIA.COM |",
  },
  description:
    "Brand Identity Redefined: PRAKRIA's Distinctive Touch In today's fast-paced world, building a brand is indispensable for making your mark and standing out in the crowd. At PRAKRIA, we have the experience and expertise to transform your brand from a mere idea to an influential force that leaves a lasting impression.",
};
function Page() {
  const data = data_service["/branding"];

  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>Brand Identity Redefined: PRAKRIA&apos;s Distinctive Touch</h1>
              <p>
                In today&apos;s fast-paced world, building a brand is indispensable
                for making your mark and standing out in the crowd. At PRAKRIA,
                we have the experience and expertise to transform your brand
                from a mere idea to an influential force that leaves a lasting
                impression.
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <GridMasonry random={false} data={data?.content} />
      </div>
      <CardsSection data={data?.CardsSection} />

      <HeroseSection data={data?.sub} />
      <Home1Blog />
      <Faq data={data?.faq} />
    </div>
  );
}

export default Page;
