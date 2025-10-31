import React from "react";
import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

export const metadata = {
  title: {
    absolute: "Web Development & Design Services | Prakria Creative & Technical Solutions"
  },
  keywords: "Web Development, web solutions company, website development services, e-commerce website designing, WordPress development services, UI/UX design agency, website services, custom website development, best web developers, web development, best UI/UX design services, e-commerce website development, e-commerce website design company, Shopify development services, custom WordPress developers, WordPress development service, mobile applications development company, affordable static website services, web design and development, website development agency, website design and web development services, website development company",
  description: "Prakria offers full-service web development and design solutions, including custom websites, e-commerce, WordPress, Shopify, and mobile app development, combining creativity, performance, and scalability for lasting brand impact."
};


function Page() {
  const data = serviceData["/web-development"];

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
