const SubServiceIntro = ({ title, description }) => {
  if (!title && !description) return null;

  return (
    <section className="mb-20 sm:mb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center border-t border-zinc-800/50 pt-16 md:pt-24">
        <h2 className="text-4xl md:text-4xl font-serif tracking-tight leading-tight mb-8 max-w-5xl mx-auto text-white">
          {title}
        </h2>
        
        {description && (
          <p className="mx-auto max-w-4xl text-sm md:text-sm text-zinc-400 mb-10 leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServiceIntro;
