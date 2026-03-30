import React from "react";

function ResultSection(props) {
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

        {/* Result Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {props?.list?.map((item, index) => (
            <div
              key={index}
              className="basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
            >
              <div className="bg-[#1D1D1D] p-8 rounded-xl shadow-xl hover:bg-[#1D1D1D] transition duration-300 flex items-center justify-center min-h-[180px] h-full">
                <p
                  className="text-sm font-medium text-gray-200 text-center"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
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

export default ResultSection;
