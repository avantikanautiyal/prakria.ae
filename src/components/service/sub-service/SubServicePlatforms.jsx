const SubServicePlatforms = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <div className="mb-16 lg:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h2>
            {description && (
              <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative flex flex-wrap justify-between items-center gap-10 lg:gap-0 lg:px-10">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] border-t border-dashed border-zinc-800 z-0"></div>

          {list.map((item, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center group w-1/2 md:w-1/3 lg:w-auto">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-6 group-hover:border-zinc-500 group-hover:scale-110 transition-all duration-500 shadow-xl">
                {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all" />
                ) : (
                  <div className="w-10 h-10 bg-zinc-800 rounded-full animate-pulse"></div>
                )}
              </div>
              <p className="text-zinc-400 text-sm font-bold group-hover:text-white transition-colors max-w-[120px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <p className="text-zinc-500 mt-20 max-w-4xl mx-auto text-sm italic">
            {conclusionLine}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServicePlatforms;
