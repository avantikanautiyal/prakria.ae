import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute:
      "Films, Animation &amp; VFX - Lights, camera, and action - at PRAKRIA",
  },
  description:
    "We bring your visions to life through our comprehensive Films Animation and VFX services. From scriptwriting and storyboarding to final production, post-production, 3D &amp; 2D animation along with cutting-edge CGI",
};

function Page() {
  const data = serviceData["/films-animation-vfx"];

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
