import { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import NeonButton from './NeonButton';

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background elements */}
      <div 
        className="absolute inset-0 transition-transform duration-100"
        style={{
          transform: `translate(${mousePos.x / 100}px, ${mousePos.y / 100}px)`,
        }}
      >
        <div className="grid-bg absolute inset-0 opacity-30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Animated badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">
            Добро пожаловать в будущее
          </span>
        </div>

        {/* Main heading with letter animation */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <AnimatedText text="КРЕАТИВНЫЙ" className="text-gradient block" delay={400} />
          <AnimatedText text="ЦИФРОВОЙ" className="text-foreground block" delay={800} />
          <AnimatedText text="ОПЫТ" className="text-gradient-aurora block" delay={1200} />
        </h1>

        {/* Subtitle with reveal animation */}
        <p 
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}
        >
          Погрузитесь в мир невероятных анимаций, 
          <span className="text-neon-cyan"> интерактивных эффектов </span>
          и 
          <span className="text-neon-magenta"> футуристического дизайна</span>
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          <NeonButton variant="cyan">
            Исследовать
          </NeonButton>
          <NeonButton variant="magenta">
            Узнать больше
          </NeonButton>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-muted-foreground text-sm uppercase tracking-widest">Прокрути</span>
            <div className="w-6 h-10 rounded-full border-2 border-neon-cyan/50 flex justify-center pt-2">
              <div className="w-1.5 h-3 rounded-full bg-neon-cyan animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative orbs following cursor */}
      <div 
        className="fixed w-64 h-64 pointer-events-none transition-all duration-500 ease-out z-50"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          background: 'radial-gradient(circle, hsl(185, 100%, 50%, 0.1), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </section>
  );
};

export default HeroSection;
