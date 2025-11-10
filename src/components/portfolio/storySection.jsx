import Link from "next/link";
import React from "react";

function StorySection(props) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#1B1B1B]">
      {/* Water drop SVG curve effect at the top */}
      <div
        className=" absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-10"
        style={{ height: "110px" }}
      >
        <svg
          viewBox="0 0 1440 110"
          width="100%"
          height="110"
          preserveAspectRatio="none"
          className="w-full h-[50px]"
        >
          <path
            d="M -1 -1 Q 760 169 1440 -2 L 1440 0 L 0 0 Z M 197 38"
            fill="#000" // Tailwind's green-300 as you used bg-green-300
          />
        </svg>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-20">
        {/* Left Column: Title */}
        <div>
          <h3 className="text-4xl sm:text-4xl md:text-5xl  max-w-3xl font-semibold leading-tight text-gray-100">
            {props.title}
          </h3>
        </div>

        {/* Right Column: Text & Button */}
        <div className="flex flex-col justify-center text-gray-300 space-y-6">
          {props?.paragraphs?.map((paragraph, index) => {
            return (
              <p key={index} className="text-sm md:text-base leading-relaxed">
                {paragraph}
              </p>
            );
          })}

          {/* Enquire Now Button */}
          <div className="pt-4">
            <Link href="/contact-us">
              <button className="bg-gray-700 text-white py-3 px-8 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors duration-300 shadow-lg">
                Enquire Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
