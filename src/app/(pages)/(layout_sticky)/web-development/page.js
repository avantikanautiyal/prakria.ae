import React from "react";
import data_service from "@/data/data_service.json";
import CardsSection from "@/components/service/CardsSection";
import HeroseSection from "@/components/service/herosSection";
import Home1Blog from "@/components/home/blogCard";
import Link from "next/link";
import EnquireBtn from "@/components/global/enquirenow";
import { Faq } from "@/components/global/faq";

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
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>Web Wonders: Crafting Sites that Captivate</h1>
              <p>
                Get ready to witness web development like never before with
                PRAKRIA. With over 20 years of experience, we breathe life into
                websites that captivate, engage, and drive results. Our team of
                web wizards combines creativity with functionality, ensuring
                your site not only looks stunning but also converts visitors
                into loyal customers.
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <img src="/assets_main/services/web_dev/wd1.png" alt="" />
          </div>
          <div className="col-lg-4">
            <img src="/assets_main/services/web_dev/wd2.png" alt="" />
          </div>
          <div className="col-lg-4">
            <img src="/assets_main/services/web_dev/wd3.png" alt="" />
          </div>
          <div className="col-lg-4">
            <img src="/assets_main/services/web_dev/wd4.png" alt="" />
          </div>
          <div className="col-lg-4">
            <img src="/assets_main/services/web_dev/wd5.png" alt="" />
          </div>
          <div className="col-lg-4">
            <img src="/assets_main/services/web_dev/wd6.png" alt="" />
          </div>
        </div>
      </div>
      <HeroseSection data={data?.sub} />
      <CardsSection data={data?.CardsSection} />
      <Home1Blog />
      <Faq data={data?.faq} />
    </div>
  );
}

export default Page;
