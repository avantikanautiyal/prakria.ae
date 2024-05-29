"use client";
import React, { useEffect } from "react";
// import useWow from "@/hooks/useWow";
import useWow from "../../hooks/useWow";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header1 from "@/components/global/header/Header";
import Footer from "@/components/global/header/Footer";
import ThemeSwitch from "@/components/global/theme";
import ContactUs from "@/components/home/homeContact";

function ClientLayout({ children }) {
  useWow();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
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
    </div>
  );
}

export default ClientLayout;
