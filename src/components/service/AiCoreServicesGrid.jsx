"use client";
import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";

function AiCoreServicesGrid({ subServices, title, description }) {
  const router = useRouter();

  const handleCardClick = (slug) => {
    router.push(`/ai/${slug}`);
  };

  return (
    <section className="mb-20 sm:mb-32">
      <h2 className="text-4xl md:text-5xl tracking-tight mb-4 sm:mb-8 text-center text-white font-serif">
        {title || "Our Core AI Services"}
      </h2>
      <p className="mx-auto max-w-3xl text-sm md:text-base text-gray-300 text-center mb-16 leading-relaxed">
        {description || "Explore our cutting-edge AI-powered services designed to revolutionize your creative production and business growth."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subServices.map((service) => (
          <div 
            key={service._id}
            onClick={() => handleCardClick(service._id)}
            className="relative group bg-[#111111] border border-zinc-800 rounded-2xl p-8 transition-all duration-500 hover:border-zinc-600 hover:scale-[1.02] cursor-pointer overflow-hidden backdrop-blur-sm shadow-2xl"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-800/20 to-transparent rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-8 group-hover:bg-zinc-800 transition-colors shadow-inner">
                {service.herosection?.icon ? (
                  <img src={service.herosection.icon} alt={service.name} className="w-7 h-7 object-contain opacity-80 group-hover:opacity-100" />
                ) : (
                  <div className="w-6 h-6 border-2 border-zinc-700 rounded-full group-hover:border-zinc-500" />
                )}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-white pr-4">
                {service.name}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:text-zinc-300 transition-colors">
                {service.herosection?.description || service.introSection?.description || "High-end AI-powered service for modern brands."}
              </p>

              <button className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all duration-300 text-sm tracking-wide">
                Read more <HiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AiCoreServicesGrid;
