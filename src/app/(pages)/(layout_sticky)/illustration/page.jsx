import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute: "Prakria - Creative Illustration & Brand Visual Solutions | Expert Agency"
  },
  keywords: "Illustration agency, Illustration studio, Custom illustration solutions, Character illustration for a campaign, Branding illustration for a product launch, Concept art & illustration, Illustration consultants, Illustration services, Character illustration services, Personalized illustrations, Digital illustration services, Balance vector illustrations, Art illustrations, Vector illustrations, 2D illustration, 3D illustration, Hand-drawn illustration, Infographic illustration services, Animation & illustration, Illustration companies, Branding illustration, Concept artwork, Print media, Illustration design system, Illustrator agency",
  description: "Prakria specializes in custom illustration services, including character, digital, 2D & 3D, and infographic illustrations. Elevate your brand with our creative storytelling and visual communication solutions. Discover how our expert team can bring your stories to life."
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
