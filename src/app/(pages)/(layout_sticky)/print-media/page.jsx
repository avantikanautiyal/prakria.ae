import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute:
      "Print Media Advertising Services | Creative & Strategic Print Solutions by Prakria",
  },
  keywords:
    "Print media advertising, Advertising printing solutions, , Print media designs, Creative print advertisements, Advertising printing services, Printing companies,, Printing agency, Print advertisement design, Catalogue design & printing, Poster design & printing, Brochures, flyers & collaterals, Corporate & retail print media designs, Sustainable printing solutions",
  description:
    "Prakria offers over 20 years of expertise in print media advertising, delivering impactful brochure, poster, catalogue, and billboard design with a focus on creativity, strategy, and sustainability to boost brand visibility.",
};

function Page() {
  const data = serviceData["/print-media"];

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
