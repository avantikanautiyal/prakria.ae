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
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                    >
                      <g>
                        <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                      </g>
                    </svg>
                    Expertise You Can Trust
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                    >
                      <g>
                        <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                      </g>
                    </svg>
                  </span>
                  <img id="left-speaker" src="https://zenfy-next-js.vercel.app/_next/static/media/home2-banner-vector1.a4dadb47.svg" alt="" />
                  <img id="right-speaker" src="https://zenfy-next-js.vercel.app/_next/static/media/home2-banner-vector2.f0e2a83d.svg" alt="" />
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
