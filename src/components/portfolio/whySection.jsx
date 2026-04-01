import React from "react";

function WhySection(props) {
  if (!props?.title && (!props?.list || props.list.length === 0)) return null;

  return (
    <section className="bg-black text-white py-8 px-4 sm:px-8 font-sans">
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

        {/* Value Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {props?.list?.map((item, index) => (
            <div
              key={index}
              className="basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
            >
              <div className="bg-[#0F0F0F] p-8 rounded-xl shadow-2xl flex flex-col items-center justify-start text-center h-full">
                {/* Icon (dark circle with actual image) */}
                {!!item.src && (
                  <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                    {item.src && (
                      <img
                        src={item.src}
                        alt={item.alt || "icon"}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                )}

                <p className="text-sm leading-relaxed text-gray-100 mt-4">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm sm:text-base text-gray-300 w-full px-2 mt-10 text-center">
          {props.conclusionLine}
        </p>
      </div>
    </section>
  );
}

export default WhySection;
