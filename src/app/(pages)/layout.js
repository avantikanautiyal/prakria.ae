"use client";
import React, { useEffect } from "react";
import "../../../public/assets/css/bootstrap-icons.css";
import "../../../public/assets/css/boxicons.min.css";
import "../../../public/assets/css/swiper-bundle.min.css";
// import "react-modal-video/css/modal-video.css";
import "../../../public/assets/css/slick-theme.css";
import "../../../public/assets/css/animate.min.css";
import "../../../public/assets/css/slick.css";
import "../../../public/assets/css/bootstrap-datetimepicker.min.css";
// import "react-datepicker/dist/react-datepicker.css";
import "../../../public/assets/css/bootstrap.min.css";
import "yet-another-react-lightbox/styles.css";
import "../../../public/assets/css/style.css";

// import useWow from "@/hooks/useWow";
import useWow from "../../hooks/useWow";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header1 from "../../components/global/header/Header";
import Footer from "../../components/global/header/Footer";
import ThemeSwitch from "../../components/global/theme";
import ContactUs from "../../components/home/homeContact";
import Whatsapp from "@/components/global/whatsapp/Whatsapp";
import SocialWidget from "@/components/global/socialmedia/SocialWidget";

function ClientLayout({ children }) {
  useWow();
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((error) => {
      console.warn("Bootstrap JS failed to load:", error);
    });
  }, []);
  return (
    <div>
      <ThemeSwitch />
      <div className="min-h-screen">
        <Header1 />
        {children}
        <ContactUs />
        <Footer />
      </div>
      <Whatsapp/>
      <SocialWidget/>
    </div>
  );
}

export default ClientLayout;
