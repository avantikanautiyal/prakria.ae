import React from "react";

function HeroseSection({ data }) {
  return (
    <div className="container-fluid bg-dark py-5 my-[75px]">
      <div className="grid grid-cols-5 container">
        <div className=" col-span-5 md:col-span-2 flex justify-center items-center wow animate fadeInUp">
          <h2 className="uppercase font-bold text-balance">{data?.title}</h2>
        </div>
        <div className="col-span-5 md:col-span-3">
          <p className="mb-0 wow animate fadeInUp">{data?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default HeroseSection;
