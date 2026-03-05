const SubServiceNumberedCards = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-zinc-950/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h2>
            {description && (
              <p className="text-zinc-400 text-lg max-w-4xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {list.map((item, index) => (
            <div 
              key={index} 
              className={`group p-8 border rounded-2xl transition-all duration-500 flex flex-col justify-between min-h-[300px] ${
                index === 1 
                  ? 'bg-white border-white text-black' 
                  : 'bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700'
              }`}
            >
              <div>
                <span className={`text-5xl lg:text-6xl font-bold block mb-8 ${index === 1 ? 'text-black/10' : 'text-white/5'}`}>
                  {item.number || (index + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="text-xl font-bold leading-tight mb-4">
                  {item.title}
                </h3>
              </div>
              <p className={`text-sm leading-relaxed ${index === 1 ? 'text-zinc-600' : 'text-zinc-400 font-medium'}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <p className="text-center text-zinc-500 mt-16 max-w-4xl mx-auto font-medium">
            {conclusionLine}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServiceNumberedCards;
