"use client";
import React, { useState } from "react";

function CoreService(props) {
  // Handle data from props as per file_context_0
  const servicesData = props?.list || [];
  // Set initial tab to the first service's id or fallback to empty string
  const [selectedService, setSelectedService] = useState(
    servicesData[0]?.id || ""
  );
  const activeService = servicesData.find(
    (s) => s.id === selectedService
  );

  // Helper to check if a value exists and is non-empty array
  const hasArrayContent = (arr) => Array.isArray(arr) && arr.length > 0;

  return (
    <section className="mb-20 sm:mb-32">
      <h2 className="text-4xl md:text-4xl tracking-tight mb-4 sm:mb-8 text-center">
        {props?.title}
      </h2>

      <p class="mx-auto max-w-2xl text-sm md:text-sm sm:text-sm text-gray-300 sm:mb-10 leading-relaxed">{props?.description}</p>



      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Navigation */}
        <div className="flex-none lg:w-1/3 space-y-2">
          {servicesData.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 text-left ${selectedService === service.id
                  ? "bg-[#1A1A1A] text-white"
                  : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
                }`}
            >
              <img src={`/icon/service/core-${index + 1}.png`} alt={service.name + " icon"} className="w-7 h-7 object-contain" />
              <span className="font-medium">{service.name}</span>
            </button>
          ))}
        </div>

        {/* Right Column: Content */}
        {activeService && (
          <div className="flex-1 lg:pl-8">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white">
              {activeService.title}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              {activeService.description}
            </p>

            {/* Focus Area Box if exists */}
            {hasArrayContent(activeService.focusAreas) && (
              <div className="border border-gray-700 rounded-lg p-6 sm:p-8 mb-4">
                <h4 className="text-xl sm:text-2xl font-semibold mb-4">
                  {/* Prefer focusAreaTitle from data, else fallback */}
                  {activeService.focusAreaTitle ||
                    `As a dedicated ${activeService.id?.toUpperCase()} agency, we focus on:`}
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  {activeService.focusAreas.map((area, index) => (
                    <li key={index} className="text-grey-300">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Closing Note Box if exists */}
            {activeService.closingNote && (
              <div className="border border-gray-700 rounded-lg p-6 sm:p-8">
                <p className="text-lg text-gray-300">
                  {activeService.closingNote}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CoreService;