import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";
export const metadata = {
  title: {
    absolute: "Prakria Films, Animation & VFX - Creative Video Production Studio"
  },
  keywords: "Full-service production company, Video production studio, Motion graphics studio, Visual effects studio, VFX artists & technologists, Film production, Animated video production studio, Video production services, 2D animation studio, 3D animation studio, VFX company, Video editing company, Media production companies, Film production company, Film production services, Top video production companies, Animation video production company, Animation studio,  Character animation, Cinematic VFX animation,, Professional film production company, Multimedia agency",
  description: "Prakria is a full-service film production company and animation studio delivering cinematic commercials, engaging explainer videos, dynamic motion graphics, and captivating VFX. With 20+ years of creative expertise, we bring your brand stories to life through expert video editing, 2D/3D animation, and visual effects. Partner with Prakria for innovative multimedia campaigns that inspire and engage."
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
