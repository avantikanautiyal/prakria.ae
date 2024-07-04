import React from "react";
import ContactUs from "./clientContactus";

export const metadata = {
  title: "Contact Us",
  description: "Coffee or Beer ? It's on us!",
};

function Page() {
  return (
    <>
      <div className="contact-page-hero">
        <div className="container ">
          <div class="banner-wrapper">
            <div class="banner-content">
              <ul class="breadcrumb-list">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Contact Us</li>
              </ul>
              <h1>Coffee or Beer ? It&apos;s on us!</h1>
              <p>
                Our studio doesn’t have a reception. Just barge in and say Hi!
                <br></br>
                (We don’t mind receiving gifts from clients unless it’s a law
                firm we’re working with!)
              </p>
            </div>
            <div class="scroll-down-btn">
              <a href="#service-details-section">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="29"
                  viewBox="0 0 19 29"
                >
                  <path d="M9.5 0V28M9.5 28C10 24.3333 12.4 17.1 18 17.5M9.5 28C8.5 24.1667 5.4 16.7 1 17.5"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
    </>
  );
}

export default Page;
