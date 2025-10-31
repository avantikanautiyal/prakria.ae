import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute:
      "Animation, AR & VR Experiences | Engaging and Immersive Digital Storytelling by Prakria",
  },
  keywords:"3D modeling, 3D animation solutions, 2D animation, VFX animation, Interactive AR VR development, 3D animation services, AR and VR development, Augmented reality app development, Virtual reality development, AR VR app development, Mobile game development, Animated video creation services, 3D animation studios, Animation studio, Animated video creation, 3D design,  VR development, Game development services",
  description: "Prakria offers cutting-edge animation and immersive AR/VR development services, including 3D and 2D animation, VFX, game development, and interactive experiences that enhance brand engagement, improve customer retention, and drive conversions. Partner with us to create memorable digital experiences that inspire."
};
function Page() {
  // notFound();
  const data = serviceData["/3d-cgi"];

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
