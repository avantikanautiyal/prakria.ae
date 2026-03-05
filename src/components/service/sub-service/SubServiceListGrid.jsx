import { HiCheck } from 'react-icons/hi';

const SubServiceListGrid = ({ title, subtitle, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h2>
            {subtitle && (
              <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {list.map((item, index) => (
            <div 
              key={index} 
              className="group p-6 bg-zinc-900/50 border border-zinc-900 rounded-xl hover:border-zinc-700 transition-all duration-300 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <HiCheck size={14} />
              </div>
              <span className="text-lg text-zinc-300 group-hover:text-white transition-colors">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {conclusionLine && (
          <p className="text-center text-zinc-500 mt-16 max-w-3xl mx-auto italic">
            {conclusionLine}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServiceListGrid;
