import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'NVIDIA GeForce RTX 4090 Founders Edition',
    category: 'Graphics Cards',
    price: 1599,
    oldPrice: 1899,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80',
    badge: 'Hot',
    color: 'cyan' as const,
  },
  {
    id: 2,
    name: 'AMD Ryzen 9 7950X3D',
    category: 'Processors',
    price: 549,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80',
    badge: 'New',
    color: 'magenta' as const,
  },
  {
    id: 3,
    name: 'ASUS ROG Maximus Z790 Hero',
    category: 'Motherboards',
    price: 629,
    oldPrice: 749,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    badge: '-15%',
    color: 'purple' as const,
  },
  {
    id: 4,
    name: 'Samsung 990 Pro 2TB NVMe',
    category: 'SSD Storage',
    price: 179,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    color: 'cyan' as const,
  },
  {
    id: 5,
    name: 'AMD Radeon RX 7900 XTX',
    category: 'Graphics Cards',
    price: 899,
    oldPrice: 1099,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    badge: 'Hot',
    color: 'magenta' as const,
  },
  {
    id: 6,
    name: 'Intel Core i9-14900K',
    category: 'Processors',
    price: 489,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80',
    badge: 'New',
    color: 'purple' as const,
  },
  {
    id: 7,
    name: 'G.Skill Trident Z5 RGB 64GB DDR5',
    category: 'RAM Memory',
    price: 279,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    color: 'cyan' as const,
  },
  {
    id: 8,
    name: 'Corsair RM1000x 1000W 80+ Gold',
    category: 'Power Supplies',
    price: 189,
    oldPrice: 229,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&q=80',
    badge: '-18%',
    color: 'magenta' as const,
  },
];

const ProductsSection = () => {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProducts(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4">
      {/* Background effect */}
      <div className="absolute inset-0 aurora-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">
              <span className="text-gradient">Popular</span> Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Most wanted components this month
            </p>
          </div>
          
          <button className="group flex items-center gap-2 text-neon-cyan hover:text-foreground transition-colors">
            <span className="font-display font-bold uppercase tracking-wider">View All</span>
            <span className="transform transition-transform group-hover:translate-x-2">→</span>
          </button>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.id} data-index={index}>
              <ProductCard 
                {...product}
                delay={index * 100}
                isVisible={visibleProducts.includes(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
