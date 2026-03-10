const SubServiceUseCases = ({ title, description, list, conclusionLine }) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {list.map((item, index) => (
            <div 
              key={index} 
              className="p-10 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all duration-300 flex flex-col items-center justify-center min-h-[250px]"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-white mb-6">
                 {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                ) : (
                  <div className="w-8 h-8 bg-zinc-700/50 rounded-full"></div>
                )}
              </div>
              <h3 className="text-xl font-medium text-white">
                {item.title}
              </h3>
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

export default SubServiceUseCases;
