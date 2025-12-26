import { useState, useRef, ReactNode } from 'react';

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
}

const GlowingCard = ({ children, className = '' }: GlowingCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 30}deg) rotateY(${-(mousePosition.x - 150) / 30}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
      }}
    >
      {/* Gradient border */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, hsl(185, 100%, 50%), hsl(320, 100%, 60%), hsl(280, 100%, 60%))',
          padding: '2px',
        }}
      />
      
      {/* Glow effect following cursor */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, hsl(185, 100%, 50%, 0.4), transparent 70%)',
          opacity: isHovered ? 1 : 0,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-card/80 backdrop-blur-xl m-[2px] rounded-2xl p-6 h-full">
        {children}
      </div>
    </div>
  );
};

export default GlowingCard;
