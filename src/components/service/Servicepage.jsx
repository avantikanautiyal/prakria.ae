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
      <HeroSection {...props?.heroSection} />
      <OurWorkSection  {...props?.ourWork}/>
      <WhyChoose {...props?.why} />
      <CoreService  {...props?.ourCore} />
      <HowWeWork {...props?.howWork}/>
      <WhyChoose {...props?.benifits}/>
      <ServiceFAQSection {...props?.faq} />
    </>
  );
}

export default Servicepage;
