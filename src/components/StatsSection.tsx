import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 100, suffix: '+', label: 'Анимаций', color: 'cyan' },
  { value: 50, suffix: 'K', label: 'Строк кода', color: 'magenta' },
  { value: 99, suffix: '%', label: 'Плавности', color: 'purple' },
  { value: 24, suffix: '/7', label: 'Магии', color: 'cyan' },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((stat) => Math.floor(stat.value * easeOut)));

      if (step >= steps) {
        clearInterval(timer);
        setCounts(stats.map((stat) => stat.value));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const colorMap = {
    cyan: 'from-neon-cyan to-neon-blue',
    magenta: 'from-neon-magenta to-neon-purple',
    purple: 'from-neon-purple to-neon-cyan',
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              {/* Background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at center, hsl(var(--neon-${stat.color}) / 0.2), transparent 70%)`,
                  filter: 'blur(40px)',
                }}
              />

              {/* Content */}
              <div className="relative p-8 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-neon-cyan/30 transition-all duration-500 hover:transform hover:scale-105">
                {/* Number */}
                <div className={`text-5xl md:text-6xl font-display font-bold bg-gradient-to-r ${colorMap[stat.color as keyof typeof colorMap]} bg-clip-text text-transparent`}>
                  {counts[index]}
                  <span className="text-3xl">{stat.suffix}</span>
                </div>

                {/* Label */}
                <div className="mt-4 text-muted-foreground uppercase tracking-widest text-sm">
                  {stat.label}
                </div>

                {/* Decorative line */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(--neon-${stat.color})), transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
