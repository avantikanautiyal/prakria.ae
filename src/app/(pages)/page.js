import HomeBanner from "@/components/global/banner/HomeBanner";
import Image from "next/image";
import WhatWeDo from "@/components/home/whatwedo";
import ServiceSection from "@/components/home/serviceSection";
import Home1About from "@/components/home/homeAbout";
import HomeTestimonial from "@/components/home/ClientTestimonial";
import LogoMarquee from "@/components/home/InfiniteCarosal";
import HomeCarosal from "@/components/home/homeContact";
import Blog from "@/components/home/blogCard";
export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <Home1About />
      <WhatWeDo
        content={[
          {
            title: "marketing",
            description: "marketing loreem",
            content: <div>marketing content</div>,
          },
          {
            title: "marketing 2",
            description: "marketing loreem",
            content: <div>marketing content</div>,
          },
          {
            title: "marketing 3",
            description: "marketing loreem",
            content: <div>marketing content</div>,
          },
          {
            title: "marketing4",
            description: "marketing loreem",
            content: <div>marketing content</div>,
          },
          {
            title: "marketing 5",
            description: "marketing loreem",
            content: <div>marketing content</div>,
          },
        ]}
      />
      <ServiceSection
        title={"Digital Marketing"}
        content={[
          {
            id: 1,
            className: "md:col-span-2",

            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 2,
            className: "md:col-span-1",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 3,
            className: "md:col-span-1",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 4,
            className: "md:col-span-2",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
        ]}
      />
      <ServiceSection
        title={"Branding"}
        content={[
          {
            id: 1,
            className: "md:col-span-2",

            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/film_animation.jpg",

            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 2,
            className: "md:col-span-1",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 3,
            className: "md:col-span-1",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 4,
            className: "md:col-span-2",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
        ]}
      />
      <ServiceSection
        title={"Packaging Design"}
        content={[
          {
            id: 1,
            className: "md:col-span-2",

            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 2,
            className: "md:col-span-1",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/digital_marketing.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 3,
            className: "md:col-span-1",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/film_animation.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
          {
            id: 4,
            className: "md:col-span-2",
            title: "Rivers are serene",
            link: "/",
            thumbnail: "/images/branding.jpg",
            description:
              "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.",
          },
        ]}
      />
      <LogoMarquee />
      <HomeTestimonial />

      <Blog />
      <HomeCarosal />
    </div>
  );
}
