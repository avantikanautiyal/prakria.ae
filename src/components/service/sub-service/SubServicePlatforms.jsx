const SubServicePlatforms = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-4xl font-serif tracking-tight leading-tight mb-6 text-white">
              {title}
            </h2>
            {description && (
              <p className="mx-auto max-w-4xl text-sm md:text-sm text-zinc-400 mb-8 leading-relaxed font-light">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative flex flex-wrap justify-center items-start gap-12 lg:px-10 mt-12">
          {/* Connector Line (Hidden on mobile) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[1px] border-t border-dashed border-zinc-800 z-0" />

          {list.map((item, index) => (
            <div key={index} className="flex flex-col items-center group relative z-10 w-32 md:w-40">
              
              <div className="w-20 h-20 md:w-20 md:h-20 rounded-full  flex items-center justify-center text-white mb-6 group-hover:border-zinc-500 transition-all duration-300">
                {!!item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-20 h-20 md:w-20 md:h-20 object-contain grayscale group-hover:grayscale-0 transition-all" />
                ) : (
                    <div className="w-10 h-10 bg-zinc-800 rounded-full" />
                )}
              </div>
              <p className="text-zinc-400 text-[10px] md:text-xs font-medium group-hover:text-white transition-colors tracking-[0.1em] text-center px-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <div className="mt-12 text-center">
            <p className="text-zinc-500 text-sm md:text-base max-w-4xl mx-auto font-light leading-relaxed">
              {conclusionLine}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServicePlatforms;
