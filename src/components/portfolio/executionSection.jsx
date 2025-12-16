import React from "react";

function ExecutionSection(props) {
  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl sm:text-5xl md:text-5xl mb-4">
        {props?.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            {props?.description}
          </p>
        </div>

        {/* Timeline / Grid Section */}
        {/* Relative positioning for the timeline line. Hidden on small screens. */}
        <div className="relative flex justify-center pb-12">
          {/* Timeline line - hidden on small screens, appears on medium and up.
      The top-[3.5rem] positions the line exactly in the vertical center 
      of the w-28 (7rem) icon above it.
    */}
          <div className="hidden md:block absolute top-[3.5rem] left-0 right-0 h-1 border-t-2 border-dashed border-gray-600 w-full transform -translate-y-1/2"></div>

          {/* Grid for timeline items */}
          <div
            className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-y-12 md:gap-y-0 md:gap-x-8 lg:gap-x-12 z-10 w-full"
          >
            {props?.list?.map((sec, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center relative flex-1"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-800 flex items-center justify-center mb-6 shadow-lg border-gray-700">
                    <img
                      src={sec?.src}
                      alt={sec?.alt}
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                    {sec?.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 max-w-xs px-2">
                    {sec.description}
                  </p>
                </div>
              );
            })}
          </div>


        </div>
        <p className="text-sm sm:text-base text-gray-300 w-full px-2 text-center">
          {props.conclusionLine}
        </p>
      </div>

    </section>
  );
}

export default ExecutionSection;
