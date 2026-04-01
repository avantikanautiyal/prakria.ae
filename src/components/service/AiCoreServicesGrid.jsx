"use client";
import React from "react";
import { useRouter } from "next/navigation";

function AiCoreServicesGrid({ subServices = [], title, description }) {
  const router = useRouter();

  const handleCardClick = (slug) => {
    router.push(`/ai/${slug}`);
  };

  return (
    <section className="mb-4 sm:mb-10">
      <h2 className="text-4xl md:text-5xl tracking-tight mb-4 sm:mb-8 text-center text-white font-serif">
        {title || "Our Core AI Services"}
      </h2>

      <p className="mx-auto max-w-3xl text-sm md:text-base text-gray-300 text-center mb-16 leading-relaxed">
        {description ||
          "Explore our cutting-edge AI-powered services designed to revolutionize your creative production and business growth."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[1px] border-zinc-800 overflow-hidden">
        {subServices.map((service, index) => {
          const pattern = index % 4;
          const isGradientCard = pattern === 0;
          const isWhiteCard = pattern === 3;
          const isBlackCard = pattern === 1 || pattern === 2;

          return (
            <div
              key={service._id}
              onClick={() => handleCardClick(service._id)}
              className={`relative group p-6 cursor-pointer border-[1px] border-zinc-800 overflow-hidden transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 hover:border-white/30
                ${isGradientCard ? "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),rgba(0,0,0,1)_60%)] text-white" : ""}
                ${isBlackCard ? "bg-black text-white" : ""}
                ${isWhiteCard ? "bg-white text-black" : ""}
              `}
            >
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100
                  ${isWhiteCard ? "bg-black/5" : "bg-white/5"}
                `}
              />
              {/* Decorative shapes */}
              <div
                className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl opacity-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-20
                  ${isWhiteCard ? "bg-black" : "bg-white"}
                `}
              />
              <div
                className={`absolute top-20 right-[25%] w-12 h-12 rounded-full opacity-5 transition-all duration-300 group-hover:opacity-15
                  ${isWhiteCard ? "bg-black" : "bg-white"}
                `}
              />
              <div
                className={`absolute bottom-24 right-[20%] w-10 h-10 rotate-[25deg] opacity-10 transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-20
                  ${isWhiteCard ? "bg-black" : "bg-white"}
                `}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", background: isWhiteCard ? "#000" : "#fff" }}
              />

              <div className="relative z-10 flex h-full flex-col">
                {/* <p
                  className={`text-[14px] uppercase mb-4 font-medium
                    ${isWhiteCard ? "text-slate-500" : "text-zinc-500"}
                  `}
                >
                  {service.category || "Video Production Services"}
                </p> */}

                <div className="flex items-center gap-6 mb-10">
                  <div
                    className={`w-24 h-24 rounded-xl flex items-center
                     
                    `}
                  >
                    {service.herosection?.icon ? (
                      <img
                        src={service.herosection.icon}
                        alt={service.name}
                        className={`w-12 h-12 object-contain transition-all duration-300 ${isWhiteCard ? "" : "opacity-80 group-hover:opacity-100"} group-hover:scale-105`}
                      />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white opacity-20" />
                    )}
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-serif tracking-tight leading-tight ${isWhiteCard ? "text-black" : "text-white"}`}>
                    {service.name}
                  </h3>
                </div>

                <p
                  className={`text-base leading-relaxed mb-12 transition-all duration-300 group-hover:opacity-90
                    ${isWhiteCard ? "text-slate-600" : "text-zinc-400"}
                  `}
                >
                  {service?.metaDescription ||
                    service?.metaDescription ||
                    "High-end AI-powered service for modern brands."}
                </p>

                <button
                  className={`mt-auto flex items-center gap-2 text-sm font-bold tracking-wide transition-all duration-300 group-hover:gap-4
                    ${isWhiteCard ? "text-black" : "text-white"}
                  `}
                >
                  Read more <i className="bi bi-arrow-right text-base" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AiCoreServicesGrid;
