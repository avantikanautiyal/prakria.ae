import Link from 'next/link';

const SubServiceRelated = ({ title, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 border-t border-zinc-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 italic">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {list.map((item, index) => (
            <div 
              key={index} 
              className={`p-10 rounded-2xl border transition-all duration-300 flex flex-col min-h-[400px] ${
                index === 1 
                  ? 'bg-white border-white text-black' 
                  : 'bg-zinc-950 border-zinc-900 text-white hover:border-zinc-800'
              }`}
            >
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${index === 1 ? 'bg-zinc-100' : 'bg-zinc-900'}`}>
                {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" />
                ) : (
                  <div className="w-6 h-6 bg-zinc-800 rounded-lg"></div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-6 italic leading-tight uppercase">
                {item.title}
              </h3>
              
              <p className={`text-lg leading-relaxed mb-10 line-clamp-4 ${index === 1 ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {item.description}
              </p>

              <div className="mt-auto">
                <Link 
                  href={item.buttonLink || "#"}
                  className={`inline-flex items-center gap-2 group font-bold ${index === 1 ? 'text-black' : 'text-white'}`}
                >
                  {item.buttonText || 'Read more'}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <p className="text-center text-zinc-500 max-w-5xl mx-auto font-medium italic">
            {conclusionLine}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServiceRelated;
