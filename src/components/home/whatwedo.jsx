"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function Whatwedo({ content }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <div
      className="home4-banner-section"
      style={{
        background:
          "url(https://zenfy-next-js.vercel.app/_next/static/media/home4-banner-bg-dark.9899db56.png)",
        padding: "100px 0px",
      }}
    >
      <div className="container">
        <h1 className="font-bold text-center mb-5 text-4xl uppercase">
          What we Do
        </h1>
        <div className="row g-4">
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img
                  className="rounded-sm"
                  src="/images/digital_marketing.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>DIGITAL MARKETING</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img
                  className="rounded-sm"
                  src="/images/packaging.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>PACKAGING DESIGN</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img className="rounded-sm" src="/images/branding.jpg" alt="" />
              </div>
              <div className="content">
                <h4>BRANDING</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img
                  className="rounded-sm"
                  src="/images/print_media.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>PRINT MEDIA</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img className="rounded-sm" src="/images/3d_cgi.jpg" alt="" />
              </div>
              <div className="content">
                <h4>3D & CGI</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img className="rounded-sm" src="/images/ar_vr.jpg" alt="" />
              </div>
              <div className="content">
                <h4>AR, VR & GAME TECH</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img
                  className="rounded-sm"
                  src="/images/film_animation.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>FILMS, ANIMATION & VFX</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img
                  className="rounded-sm"
                  src="/images/illustration.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>ILLUSTRATION</h4>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: "400ms",
            }}
          >
            <div className="about-feature-card two">
              <div className="icon d-flex justify-content-center">
                <img className="rounded-sm" src="/images/web_dev.jpg" alt="" />
              </div>
              <div className="content">
                <h4>WEB DEVELOPMENT</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Whatwedo;
