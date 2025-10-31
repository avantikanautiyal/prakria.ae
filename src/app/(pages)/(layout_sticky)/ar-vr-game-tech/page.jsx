import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute: "Prakria AR, VR & Game Tech - Immersive AR VR Development & Game Creation"
  },
  keywords: "AR VR development, 3D animation, Game development services, 2D animation, 3D visuals,Animated video creation, VR development, Augmented reality app development, Game development services (mobile game development), Top animation, AR, VR, and game technologies, 3D Animation & 3D Modeling, VFX animation services, Game development company, Mobile game development, Virtual reality development expertise, Animation studio",
  description: "Prakria combines cutting-edge technology and creativity to deliver immersive AR and VR experiences, 2D/3D animation, and innovative game development services. From virtual reality training simulations to interactive mobile games and augmented reality apps, we craft engaging digital worlds that captivate and connect your audience."
};
function Page() {
  const data = serviceData["/ar-vr-game-tech"];


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

