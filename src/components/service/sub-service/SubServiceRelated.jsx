import Link from 'next/link';

const SubServiceRelated = ({ title, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-8 md:py-10 border-t border-zinc-900/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-center md:text-left text-4xl md:text-4xl font-serif tracking-tight leading-tight mb-12 md:mb-16 text-white">
            {title}
          </h2>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {list.map((item, index) => {
            return (
              <div
                key={index} 
                className="group p-10 rounded-xl transition-all duration-500 flex flex-col min-h-[250px] bg-zinc-900/40 border-2 border-white/10 text-white hover:bg-white hover:text-black active:bg-white active:text-black hover:border-transparent active:border-transparent cursor-pointer hover:shadow-2xl hover:scale-[1.02] w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-10 bg-zinc-900 group-hover:bg-zinc-100 group-active:bg-zinc-100 transition-colors duration-500">
                  {!!item.icon && (
                    <img src={item.icon} alt={item.title} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                  )}
                </div>

                <h3 className="text-2xl font-serif mb-6 leading-tight text-zinc-400 group-hover:text-zinc-600 group-active:text-zinc-600 transition-colors duration-500">
                  {item.title}
                </h3>

                <p className="text-base leading-relaxed mb-6 line-clamp-4 font-light text-zinc-400 group-hover:text-zinc-600 group-active:text-zinc-600 transition-colors duration-500">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <Link
                    href={item._id || "#"}
                    className="inline-flex items-center gap-2 font-bold text-sm text-zinc-400 group-hover:text-zinc-600 group-active:text-zinc-600 transition-colors duration-500"
                  >
                    {item.buttonText || 'Read more'}
                    <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {conclusionLine && (
          <div className="mt-12 text-center">
            <p className="text-zinc-500 text-sm md:text-base max-w-5xl mx-auto font-light leading-relaxed">
              {conclusionLine}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceRelated;
