import { useEffect, useRef, useState } from 'react';
import GlowingCard from './GlowingCard';
import { Sparkles, Zap, Layers, Palette, Code, Rocket } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Магия анимаций',
    description: 'Плавные переходы и эффекты, которые оживляют каждый элемент',
    color: 'cyan',
  },
  {
    icon: Zap,
    title: 'Молниеносная скорость',
    description: 'Оптимизированная производительность для максимально плавного опыта',
    color: 'magenta',
  },
  {
    icon: Layers,
    title: 'Глубина дизайна',
    description: '3D-эффекты и параллакс создают ощущение пространства',
    color: 'purple',
  },
  {
    icon: Palette,
    title: 'Неоновая палитра',
    description: 'Яркие цвета и градиенты, которые притягивают взгляд',
    color: 'cyan',
  },
  {
    icon: Code,
    title: 'Чистый код',
    description: 'Элегантные решения на основе современных технологий',
    color: 'magenta',
  },
  {
    icon: Rocket,
    title: 'Инновации',
    description: 'Передовые техники для создания уникального опыта',
    color: 'purple',
  },
];

const colorMap = {
  cyan: 'text-neon-cyan',
  magenta: 'text-neon-magenta',
  purple: 'text-neon-purple',
};

const FeaturesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4">
      {/* Section header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
          <span className="text-gradient">Возможности</span> без границ
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Каждый элемент создан с вниманием к деталям и любовью к дизайну
        </p>
      </div>

      {/* Features grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isVisible = visibleCards.includes(index);
          
          return (
            <div
              key={index}
              data-index={index}
              className="opacity-0"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
                transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <GlowingCard className="h-full">
                <div className="flex flex-col h-full">
                  {/* Icon container */}
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colorMap[feature.color as keyof typeof colorMap]}`}
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--neon-${feature.color}) / 0.2), transparent)`,
                      border: `1px solid hsl(var(--neon-${feature.color}) / 0.3)`,
                    }}
                  >
                    <Icon size={28} className="animate-pulse" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-xl font-display font-bold mb-3 ${colorMap[feature.color as keyof typeof colorMap]}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover line */}
                  <div 
                    className="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, hsl(var(--neon-${feature.color})), transparent)`,
                    }}
                  />
                </div>
              </GlowingCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
