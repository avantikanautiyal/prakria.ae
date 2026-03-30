import HomeBanner from "@/components/global/banner/HomeBanner";
import WhatWeDo from "@/components/home/whatwedo";
import ServiceSection from "@/components/home/serviceSection";
import Home1About from "@/components/home/homeAbout";
import HomeTestimonial from "@/components/home/ClientTestimonial";
import LogoMarquee from "@/components/home/InfiniteCarosal";
import Blog from "@/components/home/blogCard";
import homePortfolio from "@/data/home_portfolio.json";
export const metadata = {
  description:
    "Top Creative Marketing Agency. Prakria: The creative design agency where cutting-edge quality meets lightning-fast delivery",
};
export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <Home1About />
      <LogoMarquee />
      <WhatWeDo />
      {homePortfolio.map((item, index) => (
        <ServiceSection
          key={index}
          title={item.title}
          link={item.link}
          content={item.content}
        />
      ))}
      
      <HomeTestimonial />

      <Blog />
   
    </div>
  );
}
