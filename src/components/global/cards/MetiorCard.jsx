import React from "react";
import { Meteors } from "../../ui/metior";

export default function MeteorCard({ title, description }) {
  return (
    <div className="justify-center items-center w-full flex wow animate fadeInUp">
      <div className=" w-full relative">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r  to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
        <div className="service-card two relative overflow-hidden">
          

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {title}
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            {description}
          </p>

          {/* <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
            Explore
          </button> */}

          {/* Meaty part - Meteor effect */}
          {/* <Meteors number={20} /> */}
        </div>
      </div>
    </div>
  );
}
