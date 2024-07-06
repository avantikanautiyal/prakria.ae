import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";
import Home1Blog from "@/components/home/blogCard";
import EnquireBtn from "@/components/global/enquirenow";
import { Faq } from "@/components/global/faq";
export const metadata = {
  title: {
    absolute: "Digital Marketing - Lead the Era of DIGITAL DOMINATION",
  },
  description:
    "In the era that’s growing more &amp; more digital by the day, lead the way with PRAKRIA’s 20+ years of expertise in the creative industry.",
};
function Page() {
  const data = data_service["/digital-marketing"];
  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>Lead the Era of DIGITAL DOMINATION</h1>
              <p>
                In the era that’s growing more & more digital by the day, lead
                the way with PRAKRIA’s 20+ years of expertise in the creative
                industry. Our digital marketing services are meticulously
                crafted to reshape your brand&apos;s online landscape. From
                captivating content strategies to cutting-edge campaigns, we
                unlock the full potential of your brand in the digital realm.
                Trust our insights to catapult your brand to new heights.
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      {/* <img src=""/> */}
      <div className="container-fluid">
        <GridMasonry random={false} data={data?.content} />
      </div>
      <CardsSection data={data?.CardsSection} />

      <HeroseSection data={data?.sub} />
      <div className="container">
        <div className="text-center">
          <h2>
            Looking for specific Digital Marketing Services to kickstart your
            Digital plans?
          </h2>
          <p>
            Explore the cornucopia of digital marketing services best suited for
            your business.
          </p>
        </div>
        <div className="row mb-5">
          {data?.cardsSection.cards.map((card, index) => {
            return <ContentCard {...card} key={index} />;
          })}
        </div>
      </div>
      <Home1Blog />

      <Faq data={data?.faq} />
    </div>
  );
}

function ContentCard({ title, description }) {
  return (
    <div
      className="col-lg-6 mb-4 col-md-6 wow animate fadeInDown"
      data-wow-delay="200ms"
      data-wow-duration="1500ms"
      style={{
        visibility: "visible",
        animationDuration: "1500ms",
        animationDelay: "200ms",
      }}
    >
      <div className="about-feature-card d-flex p-4">
        
        <div className="content">
          <h4 className="mb-2">{title}</h4>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
