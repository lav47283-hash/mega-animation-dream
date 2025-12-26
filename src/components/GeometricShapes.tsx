const GeometricShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Rotating rings */}
      <div className="absolute top-20 right-20 w-64 h-64">
        <div 
          className="absolute inset-0 spin-slow"
          style={{
            border: '2px solid hsl(185, 100%, 50%, 0.3)',
            borderRadius: '50%',
          }}
        />
        <div 
          className="absolute inset-4 spin-reverse"
          style={{
            border: '2px solid hsl(320, 100%, 60%, 0.3)',
            borderRadius: '50%',
          }}
        />
        <div 
          className="absolute inset-8 spin-slow"
          style={{
            border: '2px solid hsl(280, 100%, 60%, 0.3)',
            borderRadius: '50%',
            animationDuration: '15s',
          }}
        />
      </div>

      {/* Floating triangles */}
      <svg className="absolute bottom-32 left-20 w-32 h-32 floating opacity-30" viewBox="0 0 100 100">
        <polygon 
          points="50,10 90,90 10,90" 
          fill="none" 
          stroke="hsl(185, 100%, 50%)" 
          strokeWidth="2"
        />
      </svg>

      <svg className="absolute top-1/3 left-10 w-24 h-24 floating-delayed opacity-20" viewBox="0 0 100 100">
        <polygon 
          points="50,10 90,90 10,90" 
          fill="none" 
          stroke="hsl(320, 100%, 60%)" 
          strokeWidth="2"
          style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}
        />
      </svg>

      {/* Hexagon */}
      <svg className="absolute top-1/2 right-32 w-40 h-40 spin-slow opacity-25" viewBox="0 0 100 100">
        <polygon 
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
          fill="none" 
          stroke="hsl(280, 100%, 60%)" 
          strokeWidth="2"
        />
      </svg>

      {/* Diamond */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-16 h-16 floating opacity-30"
        style={{
          border: '2px solid hsl(185, 100%, 50%)',
          transform: 'rotate(45deg)',
        }}
      />

      {/* Plus signs */}
      <div className="absolute top-40 left-1/3 text-neon-cyan/30 text-6xl font-light wave">+</div>
      <div className="absolute bottom-40 right-1/3 text-neon-magenta/30 text-6xl font-light floating">+</div>

      {/* Dots pattern */}
      <div className="absolute top-1/4 left-1/2 flex gap-4 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-2 h-2 rounded-full bg-neon-cyan"
            style={{
              animation: 'bounce-subtle 1s ease-in-out infinite',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Curved line */}
      <svg className="absolute bottom-20 left-1/3 w-96 h-32 opacity-20" viewBox="0 0 400 100">
        <path 
          d="M0,50 Q100,0 200,50 T400,50" 
          fill="none" 
          stroke="url(#gradient-line)" 
          strokeWidth="2"
          className="animate-pulse"
        />
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(185, 100%, 50%)" />
            <stop offset="50%" stopColor="hsl(320, 100%, 60%)" />
            <stop offset="100%" stopColor="hsl(280, 100%, 60%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GeometricShapes;
