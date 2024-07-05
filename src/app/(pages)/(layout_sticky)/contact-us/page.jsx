import React from "react";
import ContactUs from "./clientContactus";
import EnquireBtn from "@/components/global/enquirenow";

export const metadata = {
  title: "Contact Us",
  description: "Coffee or Beer ? It's on us!",
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
