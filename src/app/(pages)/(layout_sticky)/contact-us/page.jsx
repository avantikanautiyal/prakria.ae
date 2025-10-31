import React from "react";
import ContactUs from "./clientContactus";
import EnquireBtn from "@/components/global/enquirenow";

export const metadata = {
  title: {
    absolute: "Contact Prakria Creative Tech Enterprise | Web Development, Animation & Branding"
  },
  keywords: "website development, 3D animation, video production, branding, illustration, multimedia agency, animation studio, web development company, video production house, creative services, video editing services, 3D design, UI/UX design, ecommerce web design, AR/VR development services, production agency, illustration studio, animation video production company, top web development and animation video production, website designing services, ecommerce web development, UI/UX design services, video production service, motion graphics studio, VFX company, video production company, illustration agency",
  description: "Get in touch with Prakria, a leading creative tech enterprise offering website development, 3D animation, video production, branding, and illustration services. Contact us at +91 98108 10034 or info@prakria.com for innovative digital solutions."
};

function Page() {
  return (
    <>
      <div className="service-page-hero">
        <div className="container text-center">
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>
              Coffee or Beer ? It&apos;s on us!
              </h1>
              <p>
              Our studio doesn’t have a reception. Just barge in and say Hi!
                <br></br>
                (We don’t mind receiving gifts from clients unless it’s a law
                firm we’re working with!)
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
    </>
  );
}

export default Page;
