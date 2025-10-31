import Servicepage from "@/components/service/Servicepage";
import React from "react";
import serviceData from "@/data/service_page.json";



export const metadata = {
  title : {
    absolute : "Prakria Branding Agency | Strategic Brand Building & Logo Design India"
  },
  keywords : "Brand strategy, Creative logo design services, World’s top creative agencies, Best branding consultants,  Creative design agency, Brand communication & strategy services,Creative marketing agency, Brand promotion companies, Branding and marketing strategy, Food product branding, Luxury brand positioning, Startup brand building,  Branding companies, Branding agencies",
  description: "Prakria is a leading branding agency with 20 years of experience, offering brand strategy, logo design, visual identity, and brand promotion services that create lasting connections and measurable business growth."
};
function Page() {
  const data = serviceData["/branding"];

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* Main content container with responsive padding and max-width */}
      <div className="space-y-[48px] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Servicepage {...data} />
      </div>
    </div>
  );
}

export default Page;

