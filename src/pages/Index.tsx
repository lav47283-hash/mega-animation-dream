import ParticleField from '@/components/ParticleField';
import FloatingOrbs from '@/components/FloatingOrbs';
import GeometricShapes from '@/components/GeometricShapes';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import StatsSection from '@/components/StatsSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background layers */}
      <FloatingOrbs />
      <ParticleField />
      <GeometricShapes />
      
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline opacity-30" />
      
      {/* Content */}
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <StatsSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
