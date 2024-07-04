"use client";
import CountUp from "react-countup";
import React from "react";
import { SiUnitednations } from "react-icons/si";

const Home1About = () => {
  return (
    <>
      <div className="home1-about-section mt-50">
        <div className="container">
          <div
            //   className="row mb-90 w-full border-2 border-red-500  "
            className="flex gap-14 items-center flex-col md:flex-row p-4"
          >
            <div
              className="col-lg-12 wow animate fadeInUp "
              data-wow-delay="200ms"
              data-wow-duration="2000ms"
            >
              <div className="about-content text-center">
                <div className="about-section-title">
               
                  <img
                    id="left-speaker"
                    src="https://zenfy-next-js.vercel.app/_next/static/media/home2-banner-vector1.a4dadb47.svg"
                    alt=""
                  />
                  <img
                    id="right-speaker"
                    src="https://zenfy-next-js.vercel.app/_next/static/media/home2-banner-vector2.f0e2a83d.svg"
                    alt=""
                  />
                  <h3 className="text-4xl">
                    {`CATAPULT YOUR BRAND TO THE NEXT LEVEL`}
                  </h3>
                  <p>
                    {`We are not your average agency. We specialize in creating
                    amazing experiences that set any event or brand out from the
                    crowd. Need a magnificent logo, a jaw-dropping 3D product
                    design, or an innovative AR filter created? Our in-house
                    360-degree creative powerhouse has you covered with
                    unrivaled speed and quality. Our team of design superheroes
                    works diligently to create high-quality, pixel-perfect
                    designs that will leave your competitors green with envy. We
                    believe in pushing the envelope and defying the clock, since
                    who says you can't create beautiful designs in record time?
                    Join the fast lane with PRAKRIA, where astonishing designs
                    are the new norm.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="about-bottom-area">
          <div className="container-fluid">
            <div className="row g-5">
              <div
                className="col-lg-3 col-md-6 wow animate fadeInUp"
                data-wow-delay="200ms"
                data-wow-duration="1500ms"
              >
                <div className="feature-card">
                  <div className="icon">
                    <img
                      src="assets/img/home1/icon/about-feature-card-icon1.svg"
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <h4>Expertise and Innovation</h4>
                    <p>
                      We pride ourselves staying at the front of innovation,
                      constantly pushing boundaries a redefining what's
                      possible.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animate fadeInUp"
                data-wow-delay="400ms"
                data-wow-duration="1500ms"
              >
                <div className="feature-card">
                  <div className="icon">
                    <img
                      src="assets/img/home1/icon/about-feature-card-icon2.svg"
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <h4>Transparent Process</h4>
                    <p>
                      Our transparent process is designed to demystify the
                      journey from concept to delivery.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animate fadeInUp"
                data-wow-delay="600ms"
                data-wow-duration="1500ms"
              >
                <div className="feature-card">
                  <div className="icon">
                    <img
                      src="assets/img/home1/icon/about-feature-card-icon3.svg"
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <h4>Client-Centric Approach</h4>
                    <p>
                      Our dedicated team takes the time to listen, &amp;
                      collaborate, ensuring that every interaction a step
                      towards your success.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animate fadeInUp"
                data-wow-delay="800ms"
                data-wow-duration="1500ms"
              >
                <div className="feature-card">
                  <div className="icon">
                    <img
                      src="assets/img/home1/icon/about-feature-card-icon4.svg"
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <h4>Cost-Effective</h4>
                    <p>
                      Our commitment to providing cost-effective solutions is
                      ingrained in our mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home1About;
