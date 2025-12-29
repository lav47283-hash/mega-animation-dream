import ParticleField from '@/components/ParticleField';
import FloatingOrbs from '@/components/FloatingOrbs';
import GeometricShapes from '@/components/GeometricShapes';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import ProductsSection from '@/components/ProductsSection';
import DealsSection from '@/components/DealsSection';
import FeaturesSection from '@/components/FeaturesSection';
import BrandsSection from '@/components/BrandsSection';
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
      
      {/* Header */}
      <Header />
      
      {/* Content */}
      <main className="relative z-10">
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
        <DealsSection />
        <FeaturesSection />
        <BrandsSection />
        <StatsSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
