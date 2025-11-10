import React from "react";

function ResultSection(props) {
  return (
    <section>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props?.list?.map((item, index) => (
            <div
              key={index}
              className="bg-[#1D1D1D] p-8 rounded-xl shadow-xl hover:bg-[#1D1D1D] transition duration-300 flex items-center justify-center min-h-[150px]"
            >
              <p className="text-sm font-medium text-gray-200 text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResultSection;
