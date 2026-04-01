import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

const SubServiceHero = ({ subtitle, title, description, buttonText, buttonLink, image }) => {
  return (
    <section className="relative pt-12 md:pt-16 pb-4 md:pb-8 overflow-hidden mb-20 sm:mb-32 px-4">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto pt-10 md:pt-5 sm:px-6 px-0">
        {/* Back Link */}
        <Link
          href="/ai"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs mb-8 group"
        >
          <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>

        <div className="">
          {/* Category / Subtitle */}
          {/* {subtitle && (
            <div className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-bold mb-6">
              {subtitle}
            </div>
          )} */}

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            {/* Icon Box */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center shrink-0">
              {image ? (
                <img src={image} alt="icon" className="w-16 h-16 md:w-20 md:h-20 text-white opacity-80 object-contain" />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-dashed border-zinc-700 rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="text-white text-4xl md:text-4xl font-serif tracking-tight leading-tight mb-6">
                {title}
              </h1>
              <p className="text-sm md:text-sm text-zinc-400 mb-8 leading-relaxed font-light">
                {description}
              </p>

              <Link
                href={buttonLink || "/contact-us"}
                className="primary-btn2 capitalize"
                data-text={buttonText || "Start a Project"}
              >
                <span>{buttonText || "Start a Project"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubServiceHero;
