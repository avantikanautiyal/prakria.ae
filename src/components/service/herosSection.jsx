import React from "react";

function HeroseSection({ data }) {
  return (
    <div className="px-4 py-6 my-[75px] grid grid-cols-5 gap-4 container">
      <div className="col-span-2 flex justify-center items-center wow animate fadeInUp">
        <h1 className="uppercase text-2xl font-bold text-balance">
          {data?.title}
        </h1>
      </div>
      <div className="col-span-3">
        <p className="text-sm wow animate fadeInUp">{data?.description}</p>
      </div>
    </div>
  );
}

export default HeroseSection;
