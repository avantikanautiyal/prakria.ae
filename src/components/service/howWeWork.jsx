import React from 'react'
function HowWeWork(props) {
  return (
    <section className="mb-20 sm:mb-32">
    {/* Section Header */}
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-4xl md:text-4xl  tracking-tight mb-4">
        {props.title}
      </h2>
        <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
        {props.description}
      </p>
    </div>

    {/* Steps List */}
    <div className="space-y-4 container mx-auto">
      {props?.list?.map((step) => (
        <div
          key={step.count}
          className="p-4 flex flex-col md:flex-row items-start gap-6 md:gap-10"
        >
          {/* Number */}
          <div className="text-4xl md:text-6xl font-semibold w-24 flex-shrink-0 leading-none pt-1">
            {step.count}
          </div>
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl sm:text-2xl  mb-6 text-white">
              {step.title}
            </h3>
            <div className="bg-[#0F0F0F] border-2 border-[#2b2b2b] rounded-lg p-6 sm:p-8 shadow-xl">
              <p className="text-sm text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default HowWeWork