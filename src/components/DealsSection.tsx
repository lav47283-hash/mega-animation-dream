import { useState, useEffect, useRef } from 'react';
import { Clock, ArrowRight, Flame, Percent } from 'lucide-react';
import NeonButton from './NeonButton';

const deals = [
  {
    id: 1,
    name: 'RTX 4080 Super',
    discount: 25,
    originalPrice: 1199,
    newPrice: 899,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80',
    endTime: new Date(Date.now() + 3600000 * 5),
  },
  {
    id: 2,
    name: 'Ryzen 7 7800X3D',
    discount: 20,
    originalPrice: 449,
    newPrice: 359,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80',
    endTime: new Date(Date.now() + 3600000 * 12),
  },
  {
    id: 3,
    name: 'MSI MAG B650 Tomahawk',
    discount: 30,
    originalPrice: 249,
    newPrice: 174,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    endTime: new Date(Date.now() + 3600000 * 8),
  },
];

const formatTime = (ms: number) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { hours, minutes, seconds };
};

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: { hours: number; minutes: number; seconds: number } }>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: typeof timeLeft = {};
      deals.forEach(deal => {
        const diff = deal.endTime.getTime() - Date.now();
        if (diff > 0) {
          newTimeLeft[deal.id] = formatTime(diff);
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, hsl(var(--neon-magenta) / 0.3), transparent 50%), radial-gradient(ellipse at 70% 50%, hsl(var(--neon-cyan) / 0.3), transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div 
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 mb-6">
            <Flame className="w-5 h-5 text-neon-magenta animate-pulse" />
            <span className="text-neon-magenta font-bold uppercase tracking-wider">Hot Deals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient-aurora">Daily</span> Sale
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Grab these deals before they expire — limited time only
          </p>
        </div>

        {/* Deals grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {deals.map((deal, index) => {
            const time = timeLeft[deal.id] || { hours: 0, minutes: 0, seconds: 0 };
            
            return (
              <div
                key={deal.id}
                className="relative group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                  transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative overflow-hidden rounded-3xl border border-neon-magenta/30 bg-card/60 backdrop-blur-xl p-6 transition-all duration-500 hover:border-neon-magenta/60 hover:shadow-[0_0_60px_-20px_hsl(var(--neon-magenta))]">
                  {/* Discount badge */}
                  <div 
                    className="absolute -top-2 -right-2 w-20 h-20 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--neon-magenta)), hsl(var(--neon-purple)))',
                      borderRadius: '0 20px 0 40px',
                    }}
                  >
                    <div className="flex items-center gap-0.5 text-white font-bold">
                      <Percent size={16} />
                      <span className="text-xl">{deal.discount}</span>
                    </div>
                  </div>

                  {/* Product image */}
                  <div className="text-center mb-6">
                    <div 
                      className="inline-flex items-center justify-center w-24 h-24 rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        border: '1px solid hsl(var(--neon-magenta) / 0.3)',
                      }}
                    >
                      <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Product info */}
                  <h3 className="font-display font-bold text-xl text-center mb-4 group-hover:text-neon-magenta transition-colors">
                    {deal.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="text-3xl font-display font-bold text-neon-magenta">
                      ${deal.newPrice.toLocaleString()}
                    </span>
                    <span className="block text-muted-foreground line-through mt-1">
                      ${deal.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-neon-cyan animate-pulse" />
                    <div className="flex gap-2">
                      {[
                        { value: time.hours, label: 'h' },
                        { value: time.minutes, label: 'm' },
                        { value: time.seconds, label: 's' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center">
                          <span 
                            className="inline-block w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg"
                            style={{
                              background: 'linear-gradient(135deg, hsl(var(--neon-cyan) / 0.2), transparent)',
                              border: '1px solid hsl(var(--neon-cyan) / 0.3)',
                            }}
                          >
                            {String(item.value).padStart(2, '0')}
                          </span>
                          <span className="text-muted-foreground text-sm ml-1">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button 
                    className="w-full py-3 rounded-xl font-display font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group/btn hover:gap-4"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--neon-magenta)), hsl(var(--neon-purple)))',
                      boxShadow: '0 0 30px hsl(var(--neon-magenta) / 0.3)',
                    }}
                  >
                    <span>Buy Now</span>
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all deals button */}
        <div 
          className="text-center mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.5s',
          }}
        >
          <NeonButton variant="magenta">
            All Deals
          </NeonButton>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
