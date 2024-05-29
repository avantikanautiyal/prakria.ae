import React from "react";
import GridMasonry from "@/components/ui/GridMasonry";
import MeteorCard from "@/components/global/cards/MetiorCard";
function page() {
  return (
    <div>
      <GridMasonry />

      <div className="footer-section style-2 px-4 py-7">
        <div className="container p-4 flex flex-col items-center justify-center">
          <div className="text-center max-w-[850px!important]">
            <h3 className="text-3xl">
              Looking for specific Digital Marketing Services to kickstart your
              Digital plans?
            </h3>
            <p className="text-sm">
              Explore the cornucopia of digital marketing services best suited
              for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center  p-4">
            <MeteorCard />
            <MeteorCard />
            <MeteorCard />
            <MeteorCard />
            <MeteorCard />
            <MeteorCard />
          </div>
        </div>
      </div>
      <div className="px-4 py-6 my-[75px] grid grid-cols-5 gap-4 container">
        <div className="col-span-2 flex justify-center items-center wow animate fadeInUp">
          <h1 className="uppercase text-2xl font-bold text-balance">
            DIGITAL MARKETING IS NOT JUST A SERVICE IT'S AN ART FORM
          </h1>
        </div>
        <div className="col-span-3">
          {" "}
          <p className="text-sm wow animate fadeInUp">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, non
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ea.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            doloribus, quod minima nemo consequuntur eligendi veritatis, quaerat
            dolor iste odit voluptates nihil? Distinctio, nemo nulla. Quia
            tempora ea eius corrupti.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
