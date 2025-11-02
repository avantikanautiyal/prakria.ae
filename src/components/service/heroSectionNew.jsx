import React from "react";

function HeroSection(props) {
  return (
    <section className="flex px-0 py-4  md:p-4 flex-col gap-4 text-center mb-20 sm:mb-32">
      <h1 className="text-white text-4xl md:text-4xl tracking-tight mb-6">
       {props?.title}
      </h1>
      <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
        {props?.description}
      </p>
      <div className="flex justify-center items-center ">
        <button className="bg-[#363636] text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-lg">
          Enquire Now
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
