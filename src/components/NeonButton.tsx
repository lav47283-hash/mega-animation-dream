import { ReactNode, useState } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  variant?: 'cyan' | 'magenta' | 'purple';
  onClick?: () => void;
  className?: string;
}

const NeonButton = ({ children, variant = 'cyan', onClick, className = '' }: NeonButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const colors = {
    cyan: {
      bg: 'hsl(185, 100%, 50%)',
      glow: '0 0 20px hsl(185, 100%, 50%, 0.5), 0 0 40px hsl(185, 100%, 50%, 0.3), 0 0 60px hsl(185, 100%, 50%, 0.2)',
      hoverGlow: '0 0 30px hsl(185, 100%, 50%, 0.7), 0 0 60px hsl(185, 100%, 50%, 0.5), 0 0 90px hsl(185, 100%, 50%, 0.3)',
    },
    magenta: {
      bg: 'hsl(320, 100%, 60%)',
      glow: '0 0 20px hsl(320, 100%, 60%, 0.5), 0 0 40px hsl(320, 100%, 60%, 0.3), 0 0 60px hsl(320, 100%, 60%, 0.2)',
      hoverGlow: '0 0 30px hsl(320, 100%, 60%, 0.7), 0 0 60px hsl(320, 100%, 60%, 0.5), 0 0 90px hsl(320, 100%, 60%, 0.3)',
    },
    purple: {
      bg: 'hsl(280, 100%, 60%)',
      glow: '0 0 20px hsl(280, 100%, 60%, 0.5), 0 0 40px hsl(280, 100%, 60%, 0.3), 0 0 60px hsl(280, 100%, 60%, 0.2)',
      hoverGlow: '0 0 30px hsl(280, 100%, 60%, 0.7), 0 0 60px hsl(280, 100%, 60%, 0.5), 0 0 90px hsl(280, 100%, 60%, 0.3)',
    },
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <button
      className={`relative overflow-hidden px-8 py-4 font-display font-bold text-lg tracking-wider uppercase transition-all duration-300 ${className}`}
      style={{
        background: isPressed ? colors[variant].bg : 'transparent',
        border: `2px solid ${colors[variant].bg}`,
        color: isPressed ? 'hsl(240, 15%, 3%)' : colors[variant].bg,
        boxShadow: colors[variant].glow,
        borderRadius: '8px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = colors[variant].hoverGlow;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = colors[variant].glow;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            background: colors[variant].bg,
            opacity: 0.4,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      ))}
      
      {/* Shimmer effect */}
      <span 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors[variant].bg}30, transparent)`,
          animation: 'shimmer 2s infinite',
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default NeonButton;
