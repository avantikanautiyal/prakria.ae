const SubServicePlatforms = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-10 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-4xl font-serif tracking-tight leading-tight mb-6 text-white">
              {title}
            </h2>
            {description && (
              <p className="mx-auto max-w-4xl text-sm md:text-sm text-zinc-400 mb-10 leading-relaxed font-light">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative flex flex-wrap justify-center items-center gap-12 lg:px-10 mt-12">
          {/* Connector Line (Hidden on mobile) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[1px] border-t border-dashed border-zinc-800 z-0" />

          {list.map((item, index) => (
            <div key={index} className="flex flex-col items-center group relative z-10 w-32 md:w-40">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-6 group-hover:border-zinc-500 transition-all duration-300">
                {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-10 h-10 md:w-12 md:h-12 object-contain grayscale group-hover:grayscale-0 transition-all" />
                ) : (
                    <div className="w-10 h-10 bg-zinc-800 rounded-full" />
                )}
              </div>
              <p className="text-zinc-400 text-[10px] md:text-xs font-medium group-hover:text-white transition-colors uppercase tracking-[0.1em] text-center px-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <div className="mt-20 text-center">
            <p className="text-zinc-500 text-sm md:text-base max-w-4xl mx-auto font-light leading-relaxed italic">
              {conclusionLine}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServicePlatforms;
