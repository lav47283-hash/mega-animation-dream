import { useEffect, useRef, useState } from 'react';
import GlowingCard from './GlowingCard';
import { Truck, Shield, Headphones, CreditCard, RotateCcw, Award } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in major cities, 1-3 days nationwide',
    color: 'cyan',
  },
  {
    icon: Shield,
    title: '3 Year Warranty',
    description: 'Official manufacturer warranty on all products',
    color: 'magenta',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our experts help you choose and setup your gear',
    color: 'purple',
  },
  {
    icon: CreditCard,
    title: 'Pay in Installments',
    description: '0% interest financing for up to 12 months',
    color: 'cyan',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns, no questions asked',
    color: 'magenta',
  },
  {
    icon: Award,
    title: '100% Authentic',
    description: 'We work directly with manufacturers',
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
    <section ref={sectionRef} className="relative py-24 px-4">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-gradient">Why</span> Choose Us
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          We make buying tech simple and enjoyable
        </p>
      </div>

      {/* Features grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${colorMap[feature.color as keyof typeof colorMap]}`}
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--neon-${feature.color}) / 0.2), transparent)`,
                      border: `1px solid hsl(var(--neon-${feature.color}) / 0.3)`,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-lg font-display font-bold mb-2 ${colorMap[feature.color as keyof typeof colorMap]}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
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
