import HomeBanner from "@/components/global/banner/HomeBanner";
import Image from "next/image";
import WhatWeDo from "@/components/home/whatwedo";
import ServiceSection from "@/components/home/serviceSection";
import Home1About from "@/components/home/homeAbout";
import HomeTestimonial from "@/components/home/ClientTestimonial";
import LogoMarquee from "@/components/home/InfiniteCarosal";
import ContanctUs from "@/components/home/homeContact";
import Blog from "@/components/home/blogCard";
import whatWeDo from "@/data/what_we_do.json";
import homePortfolio from "@/data/home_portfolio.json";
export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <Home1About />
      <WhatWeDo content={whatWeDo} />
      {homePortfolio.map((item, index) => (
        <ServiceSection
          key={index}
          title={item.title}
          link={item.link}
          content={item.content}
        />
      ))}
      <LogoMarquee />
      <HomeTestimonial />

      <Blog />
      {/* <ContanctUs /> */}
    </div>
  );
}
