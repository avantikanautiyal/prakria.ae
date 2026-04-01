import React from "react";

function HeroSectionPortfolio(props) {
  if (!props?.title && (!props?.list || props.list.length === 0)) return null;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <section>
        {/* Header Section */}
        <header className="text-center py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-200">
            {props?.title}
          </h1>
          {/* <h2 className="text-2xl md:text-3xl font-bold mt-1">
            #SuperMAGGILeague
          </h2> */}
        </header>
        <main className="grid grid-cols-5 grid-rows-3 gap-2">
          {props?.list?.map((image, index) => (
            image?.type === "video" ? (
              <video
                key={index}
                src={image?.src}
                className={`w-full h-[400px] object-cover ${getColSpan(index + 1)}`}
                autoPlay
                loop
                muted
                playsInline
                poster={image?.poster}
                // onError={(e) => { e.target.src = 'https://placehold.co/1200x400/333/FFF?text=Video+Error'; }}
              >
                Sorry, your browser does not support embedded videos.
              </video>
            ) : (
              <img
                key={index}
                src={image?.src}
                alt={image?.alt}
                className={`w-full h-[400px] object-cover ${getColSpan(index + 1)}`}
                // onError={(e) => { e.target.src = 'https://placehold.co/1200x400/333/FFF?text=Image+Error'; }}
              />
            )
          ))}
        </main>
        {props?.conclusionLine && (
          <div className="mt-16 text-center border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-lg">{props?.conclusionLine}</p>
          </div>
        )}
      </section>
    </div>
  );
}


function getColSpan(index) {
    if (index === 1) return "col-span-5";
    return index % 2 === 0 ? "col-span-3" : "col-span-2";
  }
  

export default HeroSectionPortfolio;
