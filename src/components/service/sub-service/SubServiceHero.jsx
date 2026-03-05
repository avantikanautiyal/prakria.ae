import Link from 'next/link';
import { HiOutlineMicrophone } from 'react-icons/hi'; // Default icon, can be replaced by prop

const SubServiceHero = ({ subtitle, title, description, buttonText, buttonLink, icon: Icon }) => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Breadcrumbs / Subtitle */}
          <div className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-8">
            {subtitle || 'AI Services'}
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Icon Box */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shadow-2xl">
                {Icon ? (
                  <Icon size={32} />
                ) : (
                  <HiOutlineMicrophone size={32} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                {title}
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
                {description}
              </p>
              
              {buttonText && (
                <Link
                  href={buttonLink || "#"}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all duration-300"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubServiceHero;
