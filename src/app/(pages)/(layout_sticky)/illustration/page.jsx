import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute: "Illustration Agency in India- PRAKRIA&#039;s Artistic Ingenuity",
  },
  description:
    "PRAKRIA India's leading international illustration agency with over two decades of experience, our illustrators have honed their crafty brushstrokes, transforming concepts into mesmerizing visual tales.",
};

function Page() {
  const data = serviceData["/illustration"];

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
