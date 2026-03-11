import { cn } from "@/utils/cn";
import React from "react";

function StartageySection(props) {
  if (!props?.title && (!props?.list || props.list.length === 0)) return null;

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header: Title and Subtitle */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 break-words">
            {props.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto break-words">
            {props.description}
          </p>
        </div>

        <div
          className={cn(
            props?.list?.length > 5
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 text-center md:text-left"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 text-center md:text-left"
          )}
        >
          {props?.list?.map((startagey, index) => (
            <div
              className="w-full flex justify-center md:justify-start"
              key={index}
            >
              <StartagyCard even={(index + 1) % 2 === 1} {...startagey} />
            </div>
          ))}
        </div>

        <p className="text-sm sm:text-base text-gray-300 w-full px-2 mt-10 break-words text-center">
          {props.conclusionLine}
        </p>
      </div>
    </section>
  );
}

function StartagyCard({ number, title, description, even }) {
  // If even, reverse the layout: description, title, number
  // If odd, normal order: number, title, description
  return (
    <div className="flex flex-col items-center md:items-start text-white max-w-[320px] w-full break-words">
      {even ? (
        <>
          {/* 3. Small Description Card */}
          <div className="bg-[#0F0F0F] p-4 sm:p-5 rounded-xl shadow-lg mb-4 md:mb-0 w-full">
            <p className="text-sm sm:text-base font-normal leading-relaxed break-words">
              {description}
            </p>
          </div>
          {/* 2. Small Title */}
          <h2 className="text-base sm:text-lg font-normal font-serif tracking-widest uppercase mb-2 break-words w-full">
            {title}
          </h2>
          {/* 1. Small Number */}
          <div
            className="w-full text-center font-serif text-4xl sm:text-5xl md:text-6xl leading-none tracking-tight break-words"
            style={{ fontWeight: 700 }}
          >
            {number}
          </div>
        </>
      ) : (
        <>
          {/* 1. Small Number */}
          <div
              className="w-full text-center font-serif text-4xl sm:text-5xl md:text-6xl leading-none mb-2 tracking-tight break-words"
            style={{ fontWeight: 700 }}
          >
            {number}
          </div>
          {/* 2. Small Title */}
            <h2 className="text-base sm:text-lg font-normal font-serif tracking-widest uppercase mb-4 break-words w-full">
            {title}
          </h2>
          {/* 3. Small Description Card */}
            <div className="bg-[#0F0F0F] p-4 sm:p-5 rounded-xl shadow-lg w-full">
              <p className="text-sm sm:text-base font-normal leading-relaxed break-words">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default StartageySection;
