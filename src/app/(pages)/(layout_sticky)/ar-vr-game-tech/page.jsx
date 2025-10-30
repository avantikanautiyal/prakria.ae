import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute: "AR, VR & Game Tech - Best Game Development Agency in Delhi",
  },
  description:
    "We blend cutting-edge technology with our artistic flair to create mind-blowing AR & VR experiences & games that defy imagination leave the audiences spellbound.",
};
function Page() {
  const data = serviceData["/animation-ar-vr"];

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

