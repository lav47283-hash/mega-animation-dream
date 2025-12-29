import { useRef, useState, useEffect } from 'react';

const brands = [
  { name: 'NVIDIA', logo: '🟢' },
  { name: 'AMD', logo: '🔴' },
  { name: 'Intel', logo: '🔵' },
  { name: 'ASUS', logo: '⚫' },
  { name: 'MSI', logo: '🔴' },
  { name: 'Gigabyte', logo: '🟠' },
  { name: 'Corsair', logo: '🟡' },
  { name: 'Samsung', logo: '🔵' },
];

const BrandsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="relative py-16 px-4 overflow-hidden">
      {/* Section header */}
      <div 
        className="text-center mb-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold text-muted-foreground">
          Official Partner of Leading <span className="text-gradient">Brands</span>
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling brands */}
        <div className="flex gap-12 animate-marquee">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-8 py-4 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-neon-cyan/30 transition-all duration-300 hover:scale-105 shrink-0"
            >
              <span className="text-2xl">{brand.logo}</span>
              <span className="font-display font-bold text-lg text-muted-foreground whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
