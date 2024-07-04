import CardsSection from "@/components/service/CardsSection";
import React from "react";
import data_service from "@/data/data_service.json";
import GridMasonry from "@/components/ui/GridMasonry";

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
          <div class="banner-wrapper">
            <div class="banner-content">
              <h1>From Ordinary to Extraordinary: Packaging Design That Stands Out</h1>
              <p>
              Step into a world where packaging design goes beyond functionality and becomes a true reflection of your brand&apos;s essence. With a legacy of two decades, PRAKRIA has become synonymous with innovation, creativity, and strategic brilliance. Collaborating with global powerhouse brands like Nestlé, Pernod Ricard, and Burger King, we have consistently crafted packaging solutions that elevate brands and create unforgettable consumer experiences.
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
      <CardsSection data={data?.cardsSection} />
    </div>
  );
}

export default Page;
