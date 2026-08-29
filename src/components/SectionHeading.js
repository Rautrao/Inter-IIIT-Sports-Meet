export default function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight relative inline-block">
        {title}
        <div className={`absolute -bottom-3 h-1.5 bg-brand-accent rounded-full ${centered ? 'left-1/2 -translate-x-1/2 w-24' : 'left-0 w-24'}`}></div>
      </h2>
      {subtitle && (
        <p className="mt-6 text-gray-600 max-w-2xl text-lg mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
