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
  const [testimonials, setTestimonials] = React.useState([]);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const json = await res.json();
        if (json.success) {
          setTestimonials(json.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 30,
      loop: testimonials.length > 1,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: ".testi-slider-next",
        prevEl: ".testi-slider-prev",
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
  }, [testimonials.length]);

  return (
    <>
      <div
        className="home4-testimonial-section mb-80"
        style={{ marginTop: "80px" }}
      >
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
                  <div className="">
                    <h2 className="font-bold uppercase">
                      CLIENT PRAISE FUELS {/* */} <span>OUR SUCCESS</span>
                    </h2>
                    <p>
                      These voices echo the confidence and satisfaction of
                      clients who&apos;ve witnessed firsthand the impact of our
                      solutions. At PRAKRIA, our clients aren&apos;t just
                      partners.
                    </p>
                  </div>
                  <Link
                    className="button-area d-xl-none d-flex"
                    href="/contact-us"
                  >
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
                {testimonials.length > 0 && (
                  <div className="position-relative">
                    <Swiper
                      {...settings}
                      className="swiper home1-testimonial-slider"
                    >
                      <div className="swiper-wrapper">
                        {testimonials.map((testimonial, index) => (
                          <SwiperSlide key={index} className="swiper-slide">
                            <div className="testimonial-card3 style-2 flex gap-3 flex-col">
                              <img src={testimonial?.image || "/Prakria-logo.png"} alt="client" className="w-12 h-12 rounded-full object-cover mb-2" />
                              <FaQuoteLeft />
                              <p>{testimonial?.message}</p>
                              <div className="testimonial-meta">
                                <span>{testimonial?.position}</span>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </div>
                    </Swiper>
                    <div className="slider-btn-grp d-flex justify-content-between w-100 position-absolute top-[90%] translate-middle-y z-10 px-3" style={{ pointerEvents: 'none', left: 0 }}>
                      <div className="slider-btn testi-slider-prev position-absolute right-[60px]" style={{ pointerEvents: 'auto' }}>
                        <i className="bi bi-arrow-left" />
                      </div>
                      <div className="slider-btn testi-slider-next position-absolute right-[20px]" style={{ pointerEvents: 'auto' }}>
                        <i className="bi bi-arrow-right" />
                      </div>
                    </div>
                  </div>
                )}
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
