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
            className="flex gap-14 items-center flex-col md:flex-row"
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
                  <h1>
                    {`We Are Not Your Average Agency`}
                  </h1>
                  <p>
                    We are not your average agency — we’re a 360° creative and packaging design agency that specializes in crafting experiences that make every brand building journey unforgettable. Whether it’s a magnificent logo, a jaw-dropping 3D design, a next-gen AR filter, or a stunning digital interface through expert web designing and UI/UX design services, we make brands come alive across every touchpoint.<br /><br />
                    Our internal creative resource delivers unparalleled speed, quality, and imagination. From custom product packaging that turn products into icons to mobile gaming that redefines interactivity—our designs capture, connect, and convert.<br /><br />
                    Our design superheroes go above and they consistently deliver high-quality, pixel-perfect graphics that will make your competitors turn green with envy. As one of the best web developers and creative storytellers, we believe in pushing boundaries and defying the clock — because who says you can’t craft beauty and brilliance in record time?<br /><br />
                    Join the fast lane with PRAKRIA — where astonishing design, innovative brand building, and powerful digital experiences are the new norm.
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
