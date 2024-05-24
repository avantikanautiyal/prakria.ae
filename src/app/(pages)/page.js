import HomeBanner from "@/components/global/banner/HomeBanner";
import Image from "next/image";
import WhatWeDo from "@/components/home/whatwedo";
import ServiceSection from "@/components/home/serviceSection";

export default function Home() {
  return (
    <div className="">
      <HomeBanner />
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
      {/* <ServiceSection /> */}
      <div className="h-[50dvh]"></div>
    </div>
  );
}
