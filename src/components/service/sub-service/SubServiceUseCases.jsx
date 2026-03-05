const SubServiceUseCases = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-zinc-950/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <div className="mb-16 lg:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 italic">
              {title}
            </h2>
            {description && (
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item, index) => (
            <div 
              key={index} 
              className="p-10 bg-zinc-900/40 border border-zinc-900 rounded-2xl hover:bg-zinc-900/60 hover:border-zinc-800 transition-all duration-300 flex flex-col items-center justify-center min-h-[280px]"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg">
                 {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                ) : (
                  <div className="w-8 h-8 bg-zinc-700/50 rounded-full"></div>
                )}
              </div>
              <h3 className="text-xl font-medium text-zinc-300">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <p className="text-zinc-500 mt-20 max-w-5xl mx-auto leading-relaxed font-medium">
            {conclusionLine}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServiceUseCases;
