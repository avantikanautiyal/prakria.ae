"use client";
import React, { useEffect } from "react";
import useWow from "@/hooks/useWow";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header1 from "@/components/global/header/Header";
import Footer from "@/components/global/header/Footer";
import ThemeSwitch from "@/components/global/theme";

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
        <Footer />
      </div>
    </div>
  );
}

export default ClientLayout;
