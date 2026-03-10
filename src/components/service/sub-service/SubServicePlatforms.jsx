const SubServicePlatforms = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="mb-20 sm:mb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <h2 className="text-balance text-4xl md:text-4xl tracking-tight mb-6">
              {title}
            </h2>
            {description && (
              <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative flex flex-wrap justify-center items-center gap-12 lg:px-10 mt-12">
          {list.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4 group-hover:border-zinc-500 transition-all duration-300">
                {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />
                ) : (
                    <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
                )}
              </div>
              <p className="text-gray-400 text-xs font-semibold group-hover:text-white transition-colors uppercase tracking-wider">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <div className="mt-16 text-center border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-lg italic">{conclusionLine}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServicePlatforms;
