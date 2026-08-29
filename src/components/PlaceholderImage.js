export default function PlaceholderImage({ text, className = "", gradient = "bg-gradient-to-br from-brand-secondary to-brand-dark" }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${gradient} ${className}`}>
      {/* Abstract sports/stadium pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }}></div>
      <div className="absolute -inset-1/2 opacity-20 transform -rotate-12">
         <div className="w-full h-1/3 border-t-4 border-b-4 border-brand-accent/30 rounded-[100%] my-8"></div>
         <div className="w-full h-1/3 border-t-2 border-b-2 border-white/20 rounded-[100%]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center p-4 text-center">
        {text && <span className="text-white font-bold tracking-wider uppercase drop-shadow-md text-lg">{text}</span>}
      </div>
    </div>
  );
}
