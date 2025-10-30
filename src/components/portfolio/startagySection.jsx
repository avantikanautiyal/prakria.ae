import React from "react";

function StartageySection(props) {
  return (
    <section className="min-h-screen bg-black text-white py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header: Title and Subtitle */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            {props.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            {props.description}
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${props?.list?.length} gap-x-16 lg:gap-x-24 gap-y-12 justify-items-center md:justify-items-stretch text-center md:text-left`}>
          {/* --- Item 01: Audience Research --- */}
          {props?.list?.map((startagey, index) => {
            return (
              <StartagyCard
                even={(index + 1) % 2 === 1}
                {...startagey}
                // number="01"
                // title="Audience Research"
                // description="We began with deep research into the audience, understanding what excites and unites the cricket-loving community of India. Insights here set the stage for concepts that would catch attention and drive engagement."
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StartagyCard({ number, title, description, even }) {
  // If even, reverse the layout: description, title, number
  // If odd, normal order: number, title, description
  return (
    <div className="flex flex-col items-center md:items-start text-white max-w-md w-full">
      {even ? (
        <>
          {/* 3. Small Description Card */}
          <div className="bg-[#0F0F0F] p-4 sm:p-5 rounded-xl shadow-lg mb-4 md:mb-0">
            <p className="text-sm sm:text-sm font-normal leading-relaxed">
              {description}
            </p>
          </div>
          {/* 2. Small Title */}
          <h2 className="text-base sm:text-lg font-normal font-serif tracking-widest uppercase mb-2">
            {title}
          </h2>
          {/* 1. Small Number */}
          <div
            className="w-full text-center font-serif text-5xl sm:text-6xl leading-none tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {number}
          </div>
        </>
      ) : (
        <>
          {/* 1. Small Number */}
          <div
            className="w-full text-center font-serif text-5xl sm:text-6xl leading-none mb-2 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {number}
          </div>
          {/* 2. Small Title */}
          <h2 className="text-base sm:text-lg font-normal font-serif tracking-widest uppercase mb-4">
            {title}
          </h2>
          {/* 3. Small Description Card */}
          <div className="bg-[#0F0F0F] p-4 sm:p-5 rounded-xl shadow-lg">
            <p className="text-sm sm:text-base font-normal leading-relaxed">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default StartageySection;
