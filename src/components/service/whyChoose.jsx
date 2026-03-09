import React from 'react'

const features = [
    {
      icon: "⚡", // Using unicode characters as placeholders for icons
      title: "Proven Expertise",
      description:
        "With FMCG heritage and creative roots, we stand in a unique place to design campaigns that marry creativity with measurable performance.",
    },
    {
      icon: "🔗",
      title: "End-to-End Services",
      description:
        "From awareness to conversion, our integrated solutions cover every touchpoint of the digital journey.",
    },
    {
      icon: "👥",
      title: "Consultative Approach",
      description:
        "Sometimes we really act like strategic partners, and sometimes we feel like digital marketing consultants who just give insight.",
    },
    {
      icon: "✨",
      title: "Focus on ROI",
      description:
        "Everything must come back to what really matters: more traffic, more leads, and more revenue.",
    },
  ];
function WhyChoose(props) {
  return (
    <section className="text-center">
    {/* Section Header */}
    <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
      <h2 className="text-balance text-4xl md:text-4xl tracking-tight mb-6">
        {props?.title}
      </h2>
      <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
        {props?.description}
      </p>
    </div>

    {/* New Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {props?.list?.map((feature, index) => (
        <div
          key={index}
          className={
            `flex flex-col items-center p-6 transition-all duration-300 border-gray-300 
            ${[0, 1, 2].includes(index) ? "border-b-[0.1px]" : ""} 
            ${((index + 1) % 3 !== 0) ? "border-r-[0.1px]" : ""}
            gap-4`
          }
        >
          <div className="w-20 h-20  rounded-full flex items-center justify-center mb-6">
            {/* Using a large emoji for the icon, you might replace this with SVG/image icons */}
            <span
              className="text-4xl"
              role="img"
              aria-label={feature.title}
            >
              <img src={feature.src || "/Prakria-logo.png"} alt={feature.title} />
              {/* {feature.icon} */}
            </span>
          </div>

          <p className="text-base text-gray-400 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
      {props?.conclusionLine && (
        <div className="mt-16 text-center border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-lg italic">{props.conclusionLine}</p>
        </div>
      )}
  </section>

  )
}

export default WhyChoose