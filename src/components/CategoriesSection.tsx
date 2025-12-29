import { useRef, useState, useEffect } from 'react';
import { Monitor, Cpu, CircuitBoard, HardDrive, Fan, MemoryStick, Cable, Gamepad2 } from 'lucide-react';

const categories = [
  { 
    id: 1, 
    name: 'Видеокарты', 
    icon: Monitor, 
    color: 'cyan',
    count: 156,
    gradient: 'from-neon-cyan/20 to-neon-blue/20'
  },
  { 
    id: 2, 
    name: 'Материнские платы', 
    icon: CircuitBoard, 
    color: 'magenta',
    count: 89,
    gradient: 'from-neon-magenta/20 to-neon-purple/20'
  },
  { 
    id: 3, 
    name: 'Процессоры', 
    icon: Cpu, 
    color: 'purple',
    count: 72,
    gradient: 'from-neon-purple/20 to-neon-cyan/20'
  },
  { 
    id: 4, 
    name: 'SSD накопители', 
    icon: HardDrive, 
    color: 'cyan',
    count: 134,
    gradient: 'from-neon-cyan/20 to-neon-magenta/20'
  },
  { 
    id: 5, 
    name: 'Охлаждение', 
    icon: Fan, 
    color: 'magenta',
    count: 98,
    gradient: 'from-neon-magenta/20 to-neon-cyan/20'
  },
  { 
    id: 6, 
    name: 'Оперативная память', 
    icon: MemoryStick, 
    color: 'purple',
    count: 67,
    gradient: 'from-neon-purple/20 to-neon-magenta/20'
  },
  { 
    id: 7, 
    name: 'Блоки питания', 
    icon: Cable, 
    color: 'cyan',
    count: 45,
    gradient: 'from-neon-cyan/20 to-neon-purple/20'
  },
  { 
    id: 8, 
    name: 'Периферия', 
    icon: Gamepad2, 
    color: 'magenta',
    count: 203,
    gradient: 'from-neon-magenta/20 to-neon-blue/20'
  },
];

const CategoriesSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleItems(prev => [...new Set([...prev, index])]);
            }, index * 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-gradient">Категории</span> товаров
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Выберите интересующую категорию и найдите идеальное решение
        </p>
      </div>

      {/* Categories grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isVisible = visibleItems.includes(index);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={category.id}
              data-index={index}
              className="relative cursor-pointer group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(40px) scale(0.9)',
                transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div 
                className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-500 ${
                  isHovered ? 'border-neon-' + category.color + '/50 scale-105' : ''
                }`}
                style={{
                  boxShadow: isHovered 
                    ? `0 0 40px hsl(var(--neon-${category.color}) / 0.3)` 
                    : 'none',
                }}
              >
                {/* Background gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Animated border */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, hsl(var(--neon-${category.color})), transparent, hsl(var(--neon-${category.color})))`,
                    padding: '1px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                    animation: isHovered ? 'spin 3s linear infinite' : 'none',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                      isHovered ? 'scale-110' : ''
                    }`}
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--neon-${category.color}) / 0.2), transparent)`,
                      border: `1px solid hsl(var(--neon-${category.color}) / 0.3)`,
                    }}
                  >
                    <Icon 
                      size={28} 
                      className={`text-neon-${category.color} transition-all duration-300 ${
                        isHovered ? 'animate-pulse' : ''
                      }`}
                    />
                  </div>

                  {/* Name */}
                  <h3 className={`font-display font-bold text-lg mb-2 transition-colors duration-300 ${
                    isHovered ? 'text-neon-' + category.color : 'text-foreground'
                  }`}>
                    {category.name}
                  </h3>

                  {/* Count badge */}
                  <span 
                    className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full"
                  >
                    {category.count} товаров
                  </span>
                </div>

                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--neon-cyan) / 0.1), transparent)',
                    animation: isHovered ? 'shimmer 2s infinite' : 'none',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
