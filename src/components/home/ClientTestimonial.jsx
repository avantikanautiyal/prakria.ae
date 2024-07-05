"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import testimonialData from "../../data/testimonial.json";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Link from "next/link";

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home1Testimonial = ({ style }) => {
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 30,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".case-study-slider-next",
        prevEl: ".case-study-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        1400: {
          slidesPerView: 1,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="home4-testimonial-section mb-80" style={{marginTop:"80px"}}>
        <div className="container">
          <div className="row">

          
          <div
            className="col-lg-5 d-flex align-items-center wow animate fadeInLeft"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "200ms",
            }}
          >
            <div className="row mb-60">
              <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="section-title3">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={10}
                      height={10}
                      viewBox="0 0 10 10"
                    >
                      <g>
                        <circle cx={5} cy={5} r={5} />
                      </g>
                    </svg>
                    Client Testimonial
                  </span>
                  <h2 className="text-4xl">
                    CLIENT PRAISE FUELS {/* */} <span>OUR SUCCESS</span>
                  </h2>
                  <p>
                    These voices echo the confidence and satisfaction of clients
                    who&apos;ve witnessed firsthand the impact of our solutions. At
                    PRAKRIA, our clients aren&apos;t just partners.
                  </p>
                </div>
                <Link className="button-area d-xl-none d-flex" href="/contact-us">
                  <span className="details-button">
                    Become a Client
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="col-lg-7 wow animate fadeInRight"
            data-wow-delay="300ms"
            data-wow-duration="1500ms"
          >
            <div className="tetimonial-slider-wrapper">
              <Swiper {...settings} className="swiper home1-testimonial-slider">
                <div className="swiper-wrapper">
                  {testimonialData.map((testimonial, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <div className="testimonial-card3 style-2 flex gap-3 flex-col">
                        <FaQuoteLeft />
                        <p>{testimonial?.quote}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                  {/* <SwiperSlide className="swiper-slide">
                      <div className="testimonial-card3 style-2 flex gap-3 flex-col">
                        <FaQuoteLeft />
                        <p>
                          “You can adjust the length and style of the line to
                          match the overall design and formatting of your
                          document. Some other divider options include dashes,
                          stars, or even a graphical element.”
                        </p>
                      </div>
                    </SwiperSlide> */}
                </div>
              </Swiper>
            </div>
          </div>
          </div>
        </div>
        <Link
          href="/contact-us"
          className="button-area wow animate zoomIn"
          data-wow-delay="400ms"
          data-wow-duration="1500ms"
          style={{
            visibility: "visible",
            animationDuration: "1500ms",
            animationDelay: "400ms",
          }}
        >
          <span className="details-button">
            Become a Client
            <svg viewBox="0 0 13 20">
              <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
            </svg>
          </span>
        </Link>
      </div>
    </>
  );
};

export default Home1Testimonial;
