import { useRef, useState, useEffect } from 'react';

const categories = [
  { 
    id: 1, 
    name: 'Graphics Cards', 
    color: 'cyan',
    count: 156,
    gradient: 'from-neon-cyan/20 to-neon-blue/20',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80'
  },
  { 
    id: 2, 
    name: 'Motherboards', 
    color: 'magenta',
    count: 89,
    gradient: 'from-neon-magenta/20 to-neon-purple/20',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'
  },
  { 
    id: 3, 
    name: 'Processors', 
    color: 'purple',
    count: 72,
    gradient: 'from-neon-purple/20 to-neon-cyan/20',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80'
  },
  { 
    id: 4, 
    name: 'SSD Storage', 
    color: 'cyan',
    count: 134,
    gradient: 'from-neon-cyan/20 to-neon-magenta/20',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80'
  },
  { 
    id: 5, 
    name: 'Cooling Systems', 
    color: 'magenta',
    count: 98,
    gradient: 'from-neon-magenta/20 to-neon-cyan/20',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80'
  },
  { 
    id: 6, 
    name: 'RAM Memory', 
    color: 'purple',
    count: 67,
    gradient: 'from-neon-purple/20 to-neon-magenta/20',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80'
  },
  { 
    id: 7, 
    name: 'Power Supplies', 
    color: 'cyan',
    count: 45,
    gradient: 'from-neon-cyan/20 to-neon-purple/20',
    image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&q=80'
  },
  { 
    id: 8, 
    name: 'Peripherals', 
    color: 'magenta',
    count: 203,
    gradient: 'from-neon-magenta/20 to-neon-blue/20',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80'
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
          <span className="text-gradient">Browse</span> Categories
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Select a category and find the perfect solution for your build
        </p>
      </div>

      {/* Categories grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => {
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
                className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 ${
                  isHovered ? 'border-neon-' + category.color + '/50 scale-105' : ''
                }`}
                style={{
                  boxShadow: isHovered 
                    ? `0 0 40px hsl(var(--neon-${category.color}) / 0.3)` 
                    : 'none',
                }}
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`} />
                </div>

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
                <div className="relative z-10 p-4 text-center">
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
                    {category.count} products
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
