import { HiCheckCircle } from 'react-icons/hi';

const SubServiceListGrid = ({ title, subtitle, list, conclusionLine, showCheckmark = true }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-4 md:py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-4xl md:text-4xl font-serif tracking-tight leading-tight mb-6 text-white text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto max-w-4xl text-sm md:text-sm text-zinc-400 mb-10 leading-relaxed font-light">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {list.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 p-8 bg-zinc-900/30 border-2 border-white/10 rounded-xl hover:bg-zinc-900/50 transition-all duration-300 group min-h-[100px] w-full md:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1rem)] flex-grow ${showCheckmark ? 'text-left' : 'text-center'}`}
            >
              {showCheckmark && (
                <HiCheckCircle className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
              )}
              <span className={`w-full text-sm md:text-base text-zinc-300 font-light tracking-wide leading-relaxed ${showCheckmark ? 'text-left' : 'text-center'}`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <div className="mt-16 text-center">
            <p className="text-zinc-400 text-sm md:text-base max-w-4xl mx-auto font-light leading-relaxed">
              {conclusionLine}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceListGrid;
