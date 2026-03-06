import React from "react";
import HeroSection from "./heroSectionNew";
import OurWorkSection from "./ourWorkSection";
import WhyChoose from "./whyChoose";
import HowWeWork from "./howWeWork";
import ServiceFAQSection from "./faqSection";
import CoreService from "./coreService";

function Servicepage(props) {
 
  return (
    <>
      {/* Hero is usually required, but adding a check to be safe */}
      {(props?.heroSection?.title || props?.heroSection?.description) && (
        <HeroSection {...props?.heroSection} />
      )}

      {(props?.ourWork?.title || props?.ourWork?.list?.length > 0) && (
        <OurWorkSection {...props?.ourWork} />
      )}

      {(props?.why?.title || props?.why?.list?.length > 0) && (
        <WhyChoose {...props?.why} />
      )}

      {(props?.ourCore?.title || props?.ourCore?.list?.length > 0) && (
        <CoreService {...props?.ourCore} />
      )}

      {(props?.howWork?.title || props?.howWork?.list?.length > 0) && (
        <HowWeWork {...props?.howWork} />
      )}

      {(props?.benifits?.title || props?.benifits?.list?.length > 0) && (
        <WhyChoose {...props?.benifits} />
      )}

      {(props?.faq?.title || props?.faq?.list?.length > 0) && (
        <ServiceFAQSection {...props?.faq} />
      )}
    </>
  );
}

export default Servicepage;
