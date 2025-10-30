import Servicepage from "@/components/service/Servicepage";
import React from "react";
import serviceData from "@/data/service_page.json";


// export async function generateMetadata() {
//   return {
//     title: "PRAKRIA",
//   };
// }
export const metadata = {
  title: {
    absolute:
      "Branding - Best Creative &amp; Packaging Designing Company | PRAKRIA.COM |",
  },
  description:
    "Brand Identity Redefined: PRAKRIA's Distinctive Touch In today's fast-paced world, building a brand is indispensable for making your mark and standing out in the crowd. At PRAKRIA, we have the experience and expertise to transform your brand from a mere idea to an influential force that leaves a lasting impression.",
};
function Page() {
  const data = serviceData["/branding"];

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

