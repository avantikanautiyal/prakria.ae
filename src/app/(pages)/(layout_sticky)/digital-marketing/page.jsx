import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";


export const metadata = {
  title : {
    absolute : "Digital Marketing Services Agency | Prakria Marketing Experts"
  },
  keywords : "digital marketing agency, digital marketing solutions,  PPC (pay per click) campaigns, email marketing,, SEO agency, SEO strategy, social media marketing agency, pay per click advertising agency, marketing agency, PPC marketing agencies, content marketing agency, online reputation management services, influencer marketing, affiliate marketing, SEO services, performance marketing, , digital marketing services, website development, digital marketing consultant",
  description: "Drive growth with Prakria's expert digital marketing services. SEO, PPC, social media & more to boost visibility, leads, and ROI for your business."
};

function Page() {
  const data = serviceData["/digital-marketing"];

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
