import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute: "Print Media - Leading Print Media Agency in India",
  },
  description:
    "Serving top global brands like Nestlé , Pernod Ricard, Burger King, Kohler and many more, we bring our FMCG expertise to deliver print solutions that captivate and convert.",
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
