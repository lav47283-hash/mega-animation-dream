import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'NVIDIA GeForce RTX 4090 Founders Edition',
    category: 'Видеокарты',
    price: 189990,
    oldPrice: 219990,
    rating: 4.9,
    image: '🎮',
    badge: 'Хит',
    color: 'cyan' as const,
  },
  {
    id: 2,
    name: 'AMD Ryzen 9 7950X3D',
    category: 'Процессоры',
    price: 64990,
    rating: 4.8,
    image: '⚡',
    badge: 'Новинка',
    color: 'magenta' as const,
  },
  {
    id: 3,
    name: 'ASUS ROG Maximus Z790 Hero',
    category: 'Материнские платы',
    price: 72990,
    oldPrice: 84990,
    rating: 4.7,
    image: '🔧',
    badge: '-15%',
    color: 'purple' as const,
  },
  {
    id: 4,
    name: 'Samsung 990 Pro 2TB NVMe',
    category: 'SSD накопители',
    price: 18990,
    rating: 4.9,
    image: '💾',
    color: 'cyan' as const,
  },
  {
    id: 5,
    name: 'AMD Radeon RX 7900 XTX',
    category: 'Видеокарты',
    price: 129990,
    oldPrice: 149990,
    rating: 4.6,
    image: '🖥️',
    badge: 'Хит',
    color: 'magenta' as const,
  },
  {
    id: 6,
    name: 'Intel Core i9-14900K',
    category: 'Процессоры',
    price: 58990,
    rating: 4.8,
    image: '🔥',
    badge: 'Новинка',
    color: 'purple' as const,
  },
  {
    id: 7,
    name: 'G.Skill Trident Z5 RGB 64GB DDR5',
    category: 'Оперативная память',
    price: 32990,
    rating: 4.7,
    image: '💡',
    color: 'cyan' as const,
  },
  {
    id: 8,
    name: 'Corsair RM1000x 1000W 80+ Gold',
    category: 'Блоки питания',
    price: 21990,
    oldPrice: 26990,
    rating: 4.9,
    image: '⚡',
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
              <span className="text-gradient">Популярные</span> товары
            </h2>
            <p className="text-muted-foreground text-lg">
              Самые востребованные комплектующие этого месяца
            </p>
          </div>
          
          <button className="group flex items-center gap-2 text-neon-cyan hover:text-foreground transition-colors">
            <span className="font-display font-bold uppercase tracking-wider">Смотреть все</span>
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
