"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Whatwedo({ content }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default fallback services as requested to be in an array
  const defaultServices = [
    { name: "DIGITAL MARKETING", image: "/images/digital_marketing.jpg", slug: "digital-marketing" },
    { name: "PACKAGING DESIGN", image: "/images/packaging.jpg", slug: "packaging-design" },
    { name: "BRANDING", image: "/images/branding.jpg", slug: "branding" },
    { name: "PRINT MEDIA", image: "/images/print_media.jpg", slug: "print-media" },
    { name: "3D & CGI", image: "/images/3d_cgi.jpg", slug: "3d-cgi" },
    { name: "AR, VR & GAME TECH", image: "/images/ar_vr.jpg", slug: "ar-vr-game-tech" },
    { name: "FILMS, ANIMATION & VFX", image: "/images/film_animation.jpg", slug: "films-animation-vfx" },
    { name: "ILLUSTRATION", image: "/images/illustration.jpg", slug: "illustration" },
    { name: "WEB DEVELOPMENT", image: "/images/web_dev.jpg", slug: "web-development" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setServices(json.data);
        } else {
          setServices(defaultServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div
      className="home4-banner-section"
      style={{
        background:
          "url(https://zenfy-next-js.vercel.app/_next/static/media/home4-banner-bg-dark.9899db56.png)",
        padding: "50px 0px",
      }}
    >
      <div className="container">
        <h2 className="font-bold text-center mb-3  uppercase">
          What we Do
        </h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div
              key={service._id || index}
              className="col-lg-4 col-md-6 wow animate fadeInDown"
              data-wow-delay={`${200 + (index % 3) * 100}ms`}
              data-wow-duration="1500ms"
              style={{
                visibility: "visible",
                animationDuration: "1500ms",
                animationDelay: `${200 + (index % 3) * 100}ms`,
              }}
            >
              <Link href={`/services${service.slug}`}>
                <div className="about-feature-card two">
                  <div className="icon d-flex justify-content-center">
                    <img
                      className="rounded-sm w-full h-48 object-cover"
                      src={service.image || "/images/default_service.jpg"}
                      alt={service.name}
                    />
                  </div>
                  <div className="content">
                    <h4 className="uppercase">{service.name}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div
            className="col-lg-4 col-md-6 wow animate fadeInDown"
            data-wow-delay={`${200 + (9 % 3) * 100}ms`}
            data-wow-duration="1500ms"
            style={{
              visibility: "visible",
              animationDuration: "1500ms",
              animationDelay: `${200 + (9 % 3) * 100}ms`,
            }}
          >
            <Link href={"/ai"}>
              <div className="about-feature-card two">
                <div className="icon d-flex justify-content-center">
                  <img
                    className="rounded-sm w-full h-48 object-cover"
                    src={"/images/ai.jpg"}
                    alt={"AI"}
                  />
                </div>
                <div className="content">
                  <h4 className="uppercase">AI</h4>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Whatwedo;
