import AnimatedText from './AnimatedText';
import NeonButton from './NeonButton';
import { Cpu, Zap, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0">
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
            Top Tech 2026
          </span>
        </div>

        {/* Main heading with letter animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
          <AnimatedText text="TECHNO" className="text-foreground inline" delay={400} />
          <AnimatedText text="MARKET" className="text-foreground inline" delay={800} />
        </h1>

        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        >
          Best 
          <span className="text-neon-cyan"> graphics cards</span>,
          <span className="text-neon-magenta"> processors </span>
          and components at great prices
        </p>

        {/* Features row */}
        <div 
          className="flex flex-wrap justify-center gap-6 mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}
        >
          {[
            { icon: Cpu, text: 'Original Products' },
            { icon: Zap, text: 'Fast Delivery' },
            { icon: Shield, text: '3 Year Warranty' },
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
            >
              <item.icon size={20} className="text-neon-cyan" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}
        >
          <NeonButton variant="cyan">
            Browse Catalog
          </NeonButton>
          <NeonButton variant="magenta">
            View Deals
          </NeonButton>
        </div>
      </div>

      {/* Floating tech elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* CPU icon floating */}
        <div 
          className="absolute top-1/4 left-10 w-16 h-16 opacity-20 floating"
          style={{ animationDelay: '0s' }}
        >
          <Cpu className="w-full h-full text-neon-cyan" />
        </div>
        
        {/* GPU stylized */}
        <div 
          className="absolute top-1/3 right-16 w-20 h-12 border-2 border-neon-magenta/30 rounded-lg floating-delayed opacity-20"
        >
          <div className="absolute inset-2 grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-neon-magenta/40 rounded-sm" />
            ))}
          </div>
        </div>

        {/* RAM stick */}
        <div 
          className="absolute bottom-1/3 left-1/4 w-24 h-6 border border-neon-purple/30 rounded floating opacity-20"
          style={{ animationDelay: '-2s' }}
        >
          <div className="h-full flex gap-0.5 p-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-1 bg-neon-purple/40 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
