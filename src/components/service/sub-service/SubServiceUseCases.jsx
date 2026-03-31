const SubServiceUseCases = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-10 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-4xl font-serif tracking-tight leading-tight mb-6 text-white text-balance">
              {title}
            </h2>
            {description && (
              <p className="mx-auto max-w-4xl text-sm md:text-sm text-zinc-400 mb-10 leading-relaxed font-light">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {list.map((item, index) => (
            <div 
              key={index} 
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-12 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 flex flex-col items-center justify-center min-h-[300px]"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform">
                 {!!item.icon && (
                  <img src={item.icon} alt={item.title} className="w-20 h-20 md:w-20 md:h-20 object-contain opacity-80" />
                )}
              </div>
              <h3 className="text-sm md:text-base font-light text-zinc-300 tracking-wide">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <div className="mt-20">
            <p className="text-zinc-500 text-sm md:text-base max-w-5xl mx-auto leading-relaxed font-light italic">
              {conclusionLine}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceUseCases;
