import { HiCheck } from 'react-icons/hi';

const SubServiceListGrid = ({ title, subtitle, list, conclusionLine }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className="mb-20 sm:mb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <h2 className="text-balance text-4xl md:text-4xl tracking-tight mb-6">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {list.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center p-6 border-b-[0.1px] border-gray-800 ${((index + 1) % 3 !== 0) ? "md:border-r-[0.1px]" : ""} gap-4`}
            >
              <span className="text-base text-gray-400 leading-relaxed text-center">
                {item.title}
              </span>
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

export default SubServiceListGrid;
