const SubServiceNumberedCards = ({ title, description, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-10 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {list.map((item, index) => {
            return (
              <div
                key={index} 
                className="group p-10 rounded-xl transition-all duration-500 flex flex-col min-h-[200px] bg-zinc-900/40 border-2 border-white/10 text-white hover:bg-white hover:text-black active:bg-white active:text-black hover:border-transparent active:border-transparent cursor-pointer hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="text-5xl md:text-6xl font-bold mb-8 text-zinc-100 group-hover:text-zinc-800 group-active:text-zinc-800 transition-colors duration-500">
                  {item.number || (index + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold mb-4 leading-tight text-zinc-100 group-hover:text-zinc-800 group-active:text-zinc-800 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed font-light text-zinc-400 group-hover:text-zinc-600 group-active:text-zinc-600 transition-colors duration-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {conclusionLine && (
          <div className="mt-12 text-center">
            <p className="text-zinc-400 text-sm md:text-base max-w-5xl mx-auto font-light leading-relaxed">
              {conclusionLine}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceNumberedCards;
