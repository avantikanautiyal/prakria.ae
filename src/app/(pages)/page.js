import HomeBanner from "@/components/global/banner/HomeBanner";
import WhatWeDo from "@/components/home/whatwedo";
import Home1About from "@/components/home/homeAbout";
import HomeTestimonial from "@/components/home/ClientTestimonial";
import LogoMarquee from "@/components/home/InfiniteCarosal";
import Blog from "@/components/home/blogCard";
import HomeServiceSections from "@/components/home/homeServiceSections";

const baseUrl = "https://www.prakria.ae";

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "PRAKRIA",
      url: baseUrl,
      logo: `${baseUrl}/Prakria-logo.png`,
      email: "info@prakria.ae",
      telephone: "+971-52-260-7520",
      sameAs: [
        "https://www.facebook.com/prakria/",
        "https://www.instagram.com/prakria/",
        "https://in.linkedin.com/company/prakriauklimited",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "902, Aggarwal Corporate Heights, Netaji Subhash Place, Pitampura",
        addressLocality: "Delhi",
        postalCode: "110034",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "PRAKRIA",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${baseUrl}/#webpage`,
      url: baseUrl,
      name: "PRAKRIA : Best Creative Marketing Agency in India",
      description:
        "Top Creative Marketing Agency. Prakria: The creative design agency where cutting-edge quality meets lightning-fast delivery",
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      about: {
        "@id": `${baseUrl}/#organization`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${baseUrl}/Prakria-logo.png`,
      },
    },
  ],
};

export const metadata = {
  description:
    "Top Creative Marketing Agency. Prakria: The creative design agency where cutting-edge quality meets lightning-fast delivery",
};
export default function Home() {
  return (
    <div className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomeBanner />
      <Home1About />
      <LogoMarquee />
      <WhatWeDo />
      <HomeServiceSections />
      
      <HomeTestimonial />

      <Blog />
   
    </div>
  );
}
