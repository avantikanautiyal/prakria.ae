const SubServiceNumberedCards = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="mb-20 sm:mb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item, index) => (
            <div 
              key={index} 
              className="group p-8 bg-zinc-900/50 border border-zinc-900 rounded-xl hover:border-zinc-700 transition-all duration-300 flex flex-col min-h-[250px]"
            >
              <div className="mb-6">
                <span className="text-4xl font-bold text-zinc-800 group-hover:text-zinc-600 transition-colors">
                  {item.number || (index + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="text-xl font-semibold text-white mt-4">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mt-auto">
                {item.description}
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

export default SubServiceNumberedCards;
