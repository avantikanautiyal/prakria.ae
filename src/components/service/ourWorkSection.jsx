import Link from 'next/link';
import React from 'react'

const portfolioImages = [
    {
      src: "/assets_main/services/digital_marketing/1.webp",
      alt: "Maggi project screenshot",
    },
    {
      src: "/assets_main/services/digital_marketing/2.webp",
      alt: "Mobile app design screenshot",
    },
    {
      src: "/assets_main/services/digital_marketing/3.gif",
      alt: "E-commerce app screenshot",
    },
    {
      src: "/assets_main/services/digital_marketing/4.gif",
      alt: "Dove product page design",
    },
    {
      src: "/assets_main/services/digital_marketing/5.gif",
      alt: "Cosmetics brand website design",
    },
    {
      src: "/assets_main/services/digital_marketing/dm1.gif",
      alt: "Social media post for Valentine's Day",
    },
    {
      src: "/assets_main/services/digital_marketing/dm2.gif",
      alt: "Instagram post design for a brand",
    },
    {
      src: "/assets_main/services/digital_marketing/dm3.webp",
      alt: "Website design mockup on multiple devices",
    },
  ];
function OurWorkSection(props) {
  return (
    <section className="mb-20  sm:mb-32">
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
              <Link
              href={image?.link || "#"}
                key={index}
                className="rounded-lg overflow-hidden shadow-2xl bg-gray-900 transition-transform duration-300 hover:scale-105 aspect-square flex items-center justify-center"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover aspect-square"
                />
              </Link>
            ))}
          </div>
        </section>
  );
}

export default OurWorkSection