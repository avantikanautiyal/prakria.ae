import Link from 'next/link';

const SubServiceRelated = ({ title, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="mb-20 sm:mb-32 border-t border-zinc-900 pt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <h2 className="text-balance text-4xl md:text-4xl tracking-tight mb-12 sm:mb-16">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {list.map((item, index) => (
            <div 
              key={index} 
              className="p-10 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-700 transition-all duration-300 flex flex-col text-left min-h-[350px]"
            >
              <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-8">
                {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" />
                ) : (
                  <div className="w-6 h-6 bg-zinc-800 rounded-lg"></div>
                )}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-white">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-400 leading-relaxed mb-8 line-clamp-4">
                {item.description}
              </p>

              <div className="mt-auto">
                <Link 
                  href={item.buttonLink || "#"}
                  className="inline-flex items-center gap-2 group font-bold text-white hover:text-gray-300 transition-colors"
                >
                  {item.buttonText || 'Read more'}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
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

export default SubServiceRelated;
