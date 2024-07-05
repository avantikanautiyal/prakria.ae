import React from "react";
import data_service from "@/data/data_service.json";
import GridMasonry from "@/components/ui/GridMasonry";
import Home1Blog from "@/components/home/blogCard";
import EnquireBtn from "@/components/global/enquirenow";

export const metadata = {
  title: {
    absolute: "Product packaging Design Company - Designs That Stands Out",
  },
  description:
    "Step into a world where packaging design goes beyond functionality and becomes a true reflection of your brand&#039;s essence",
};

function Page() {
  const data = data_service["/packaging-design"];

  return (
    <div>
      <div className="service-page-hero">
        <div className="container text-center">
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>
                From Ordinary to Extraordinary: Packaging Design That Stands Out
              </h1>
              <p>
                Step into a world where packaging design goes beyond
                functionality and becomes a true reflection of your brand&apos;s
                essence. With a legacy of two decades, PRAKRIA has become
                synonymous with innovation, creativity, and strategic
                brilliance. Collaborating with global powerhouse brands like
                Nestlé, Pernod Ricard, and Burger King, we have consistently
                crafted packaging solutions that elevate brands and create
                unforgettable consumer experiences.
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <GridMasonry random={false} data={data?.content} />
      </div>

      <div className="container pt-5 mb-5">
        <div className="text-center">
          <h2>LOOKING FOR A SPECIFIC TYPE OF PACKAGING DESIGN?</h2>
          <p>
            Explore the different types of packaging designs best suited for
            your business.
          </p>
        </div>
        <div className="row">
          {data?.cardsSection.cards.map((card, index) => {
            return <ContentCard {...card} key={index} />;
          })}
        </div>
      </div>
      <Home1Blog />
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
