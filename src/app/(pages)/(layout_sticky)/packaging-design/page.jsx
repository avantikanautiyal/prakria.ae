import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title : {
    absolute : "Innovative Packaging Design Services | Prakria Packaging Agency India"
  },
  keywords : "Packaging design company, Food packaging design, Cosmetic packaging design to luxury packaging design, Professional packaging designers, Packaging design services, Brand packaging design, Packaging design agency, Package design companies that deliver not just visuals but complete packaging design services, Packaging strategy & design consultancy, Creative packaging design",
  description: "Prakria leads in creative and functional packaging design services—from food and luxury packaging to sustainable and custom solutions. Build your brand's shelf appeal with us."
};
function Page() {
  const data = serviceData["/packaging"];

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
