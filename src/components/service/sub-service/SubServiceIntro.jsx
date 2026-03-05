const SubServiceIntro = ({ title, description }) => {
  if (!title && !description) return null;

  return (
    <section className="py-20 lg:py-32 border-t border-zinc-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-10 max-w-5xl mx-auto leading-tight italic">
          {title}
        </h2>
        
        {description && (
          <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-6xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServiceIntro;
