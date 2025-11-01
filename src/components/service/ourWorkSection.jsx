import Link from "next/link";
import React from "react";

function OurWorkSection(props) {
  return (
    <section className="mb-20 sm:mb-32">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-balance text-4xl md:text-4xl tracking-tight mb-6">
          {props?.title}
        </h2>
        <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
          {props?.description}
        </p>
      </div>

      {/* Portfolio Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
        {props?.list?.map((image, index) => (
          <React.Fragment key={index}>
            {!!image?.link ? (
              <Link
                href={image?.link || "#"}
                key={index}
                className="rounded-lg overflow-hidden shadow-2xl bg-gray-900 transition-transform duration-300 hover:scale-105 aspect-square flex items-center justify-center"
              >
                {image.type === "video" ? (
                  <video
                    src={image.src}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover aspect-square"
                    poster={image.poster}
                  >
                    {`Sorry, your browser doesn't support embedded videos.`}
                  </video>
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover aspect-square"
                  />
                )}
              </Link>
            ) : (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-2xl bg-gray-900 transition-transform duration-300 hover:scale-105 aspect-square flex items-center justify-center"
              >
                {image.type === "video" ? (
                  <video
                    src={image.src}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover aspect-square"
                    poster={image.poster}
                  >
                    {`Sorry, your browser doesn't support embedded videos.`}
                  </video>
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover aspect-square"
                  />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default OurWorkSection;
