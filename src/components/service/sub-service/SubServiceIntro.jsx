const SubServiceIntro = ({ title, description }) => {
  if (!title && !description) return null;

  return (
    <section className="mb-20 sm:mb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-balance text-4xl md:text-4xl tracking-tight mb-6">
          {title}
        </h2>
        
        {description && (
          <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubServiceIntro;
