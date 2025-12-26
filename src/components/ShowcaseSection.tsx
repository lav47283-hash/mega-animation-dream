import { useState, useEffect, useRef } from 'react';

const ShowcaseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const showcaseItems = [
    { 
      title: 'Морфинг форм', 
      description: 'Плавные переходы между геометрическими формами',
      animation: 'morph'
    },
    { 
      title: 'Пульсация', 
      description: 'Эффект живого дыхания элементов',
      animation: 'pulse'
    },
    { 
      title: 'Вращение', 
      description: 'Бесконечное движение в пространстве',
      animation: 'spin'
    },
    { 
      title: 'Волна', 
      description: 'Органичное перетекание движения',
      animation: 'wave'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'morph': return 'morph';
      case 'pulse': return 'pulse-glow';
      case 'spin': return 'spin-slow';
      case 'wave': return 'wave';
      default: return '';
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 aurora-bg opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Animation showcase */}
          <div 
            className="relative aspect-square flex items-center justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
              transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-neon-cyan/20 spin-slow" />
            <div className="absolute inset-8 rounded-full border border-neon-magenta/20 spin-reverse" />
            <div className="absolute inset-16 rounded-full border border-neon-purple/20 spin-slow" style={{ animationDuration: '25s' }} />

            {/* Center shape */}
            <div 
              className={`w-48 h-48 ${getAnimationClass(showcaseItems[activeIndex].animation)}`}
              style={{
                background: 'linear-gradient(135deg, hsl(185, 100%, 50%), hsl(320, 100%, 60%))',
                boxShadow: '0 0 60px hsl(185, 100%, 50%, 0.5), 0 0 120px hsl(320, 100%, 60%, 0.3)',
                borderRadius: showcaseItems[activeIndex].animation === 'morph' ? undefined : '50%',
              }}
            />

            {/* Orbiting elements */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 rounded-full orbit-${i + 1}`}
                  style={{
                    top: '50%',
                    left: '50%',
                    background: i === 0 ? 'hsl(185, 100%, 50%)' : i === 1 ? 'hsl(320, 100%, 60%)' : 'hsl(280, 100%, 60%)',
                    boxShadow: `0 0 20px ${i === 0 ? 'hsl(185, 100%, 50%)' : i === 1 ? 'hsl(320, 100%, 60%)' : 'hsl(280, 100%, 60%)'}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right side - Content */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
              transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)',
              transitionDelay: '0.3s',
            }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              <span className="text-gradient-aurora">Живые</span> анимации
            </h2>

            <div className="space-y-4">
              {showcaseItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-500 ${
                    activeIndex === index
                      ? 'border-neon-cyan bg-neon-cyan/10'
                      : 'border-border/50 hover:border-neon-cyan/50 bg-card/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeIndex === index ? 'bg-neon-cyan scale-125' : 'bg-muted-foreground/50'
                      }`}
                    />
                    <div>
                      <h3 className={`font-display font-bold text-lg transition-colors duration-300 ${
                        activeIndex === index ? 'text-neon-cyan' : 'text-foreground'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  {activeIndex === index && (
                    <div className="mt-4 h-0.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                        style={{
                          animation: 'progressBar 3s linear forwards',
                        }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ShowcaseSection;
