import React from "react";

function ExecutionSection(props) {
  if (!props?.title && (!props?.list || props.list.length === 0)) return null;

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

        {/* Cards Grid */}
        <div className="pb-12">
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {props?.list?.map((sec, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center border-2 border-[#fff]/20 rounded-2xl p-8 shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
                >
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <img
                      src={sec?.src}
                      alt={sec?.alt}
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">
                    {sec?.title}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-300">
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
