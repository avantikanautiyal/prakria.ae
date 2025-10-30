import React from "react";

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
function WhyChooseSection() {
  return (
    <section className="text-center">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Why Choose PRAKRIA as Your Digital Marketing Company?
        </h2>
        <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
          A right digital marketing service provider can make the difference
          between mediocre online visibility and stratospheric success. At
          PRAKRIA we do not just run campaigns; we create digital experiences
          wherein a brand interacts with an audience.
        </p>
      </div>

      {/* New Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6  rounded-lg     transition-all duration-300"
          >
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-gray-700">
              {/* Using a large emoji for the icon, you might replace this with SVG/image icons */}
              <span className="text-4xl" role="img" aria-label={feature.title}>
                {feature.icon}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
              {feature.title}
            </h3>
            <p className="text-base text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseSection;
