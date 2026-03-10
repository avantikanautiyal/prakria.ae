import Link from 'next/link';
import { HiOutlineMicrophone } from 'react-icons/hi'; // Default icon, can be replaced by prop

const SubServiceHero = ({ subtitle, title, description, buttonText, buttonLink, icon: Icon }) => {
  return (
    <section className="flex px-0 py-4 md:p-4 flex-col gap-4 text-center mb-20 sm:mb-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs / Subtitle */}
          {subtitle && (
            <div className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-4">
              {subtitle}
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            {/* Content */}
            <div className="flex-1">
              <h1 className="text-white text-4xl md:text-5xl tracking-tight mb-6">
                {title}
              </h1>
              <p className="mx-auto max-w-4xl text-sm md:text-base text-gray-300 mb-10 leading-relaxed">
                {description}
              </p>
              
              {buttonText && (
                <div className="flex justify-center items-center">
                  <Link
                    href={buttonLink || "#"}
                    className="bg-[#363636] text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-lg"
                  >
                    {buttonText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubServiceHero;
