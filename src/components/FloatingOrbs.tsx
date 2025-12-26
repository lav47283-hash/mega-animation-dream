const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large morphing orb - top left */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 morph opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(185, 100%, 50%) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Medium orb - top right */}
      <div 
        className="absolute -top-20 -right-20 w-72 h-72 floating opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(320, 100%, 60%) 0%, transparent 70%)',
          filter: 'blur(30px)',
          borderRadius: '50%',
        }}
      />
      
      {/* Spinning orb - center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] spin-slow opacity-10"
        style={{
          background: 'conic-gradient(from 0deg, hsl(185, 100%, 50%), hsl(280, 100%, 60%), hsl(320, 100%, 60%), hsl(185, 100%, 50%))',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />
      
      {/* Bottom orbs */}
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 floating-delayed opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(280, 100%, 60%) 0%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
      
      <div 
        className="absolute -bottom-32 right-1/4 w-96 h-96 morph opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(185, 100%, 50%) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Small accent orbs */}
      <div 
        className="absolute top-1/4 right-1/3 w-32 h-32 pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(320, 100%, 60%) 0%, transparent 70%)',
          filter: 'blur(20px)',
          borderRadius: '50%',
        }}
      />
      
      <div 
        className="absolute bottom-1/3 left-1/3 w-24 h-24 wave"
        style={{
          background: 'radial-gradient(circle, hsl(185, 100%, 50%) 0%, transparent 70%)',
          filter: 'blur(15px)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default FloatingOrbs;
