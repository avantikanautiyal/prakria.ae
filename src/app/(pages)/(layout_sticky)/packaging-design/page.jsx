import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute: "Product packaging Design Company - Designs That Stands Out",
  },
  description:
    "Step into a world where packaging design goes beyond functionality and becomes a true reflection of your brand&#039;s essence",
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
