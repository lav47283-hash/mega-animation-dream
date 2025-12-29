import { useState } from 'react';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  color: 'cyan' | 'magenta' | 'purple';
  delay?: number;
  isVisible?: boolean;
}

const ProductCard = ({ 
  name, 
  category, 
  price, 
  oldPrice, 
  rating, 
  image, 
  badge,
  color,
  delay = 0,
  isVisible = true 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <div
      className="relative group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
        transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card container */}
      <div 
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl transition-all duration-500"
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? `0 20px 60px -20px hsl(var(--neon-${color}) / 0.4), 0 0 40px hsl(var(--neon-${color}) / 0.1)` 
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20">
          {/* Product image */}
          <img 
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent"
          />

          {/* Badge */}
          {badge && (
            <div 
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"
              style={{
                background: badge === 'Hot' 
                  ? 'linear-gradient(135deg, hsl(var(--neon-magenta)), hsl(var(--neon-purple)))' 
                  : badge === 'New'
                  ? 'linear-gradient(135deg, hsl(var(--neon-cyan)), hsl(var(--neon-blue)))'
                  : 'linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--neon-magenta)))',
                color: 'white',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <Zap size={12} />
              {badge}
            </div>
          )}

          {/* Like button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
              boxShadow: isLiked ? '0 0 20px hsl(var(--neon-magenta) / 0.5)' : 'none',
            }}
          >
            <Heart 
              size={18} 
              className={`transition-all duration-300 ${
                isLiked ? 'text-neon-magenta fill-neon-magenta' : 'text-muted-foreground'
              }`}
            />
          </button>

          {/* Quick actions overlay */}
          <div 
            className="absolute inset-x-4 bottom-4 flex gap-2 transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-xl font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: isAddingToCart 
                  ? `hsl(var(--neon-${color}))` 
                  : `linear-gradient(135deg, hsl(var(--neon-${color}) / 0.9), hsl(var(--neon-${color}) / 0.7))`,
                color: 'hsl(var(--background))',
                boxShadow: `0 0 30px hsl(var(--neon-${color}) / 0.5)`,
              }}
            >
              <ShoppingCart size={16} className={isAddingToCart ? 'animate-bounce' : ''} />
              {isAddingToCart ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <span className={`text-xs uppercase tracking-wider text-neon-${color}`}>
            {category}
          </span>

          {/* Name */}
          <h3 className="font-display font-bold text-lg mt-1 mb-3 line-clamp-2 group-hover:text-foreground transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={`${i < Math.floor(rating) ? 'text-neon-cyan fill-neon-cyan' : 'text-muted-foreground/30'}`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span 
              className="text-2xl font-display font-bold"
              style={{
                background: `linear-gradient(135deg, hsl(var(--neon-${color})), hsl(var(--foreground)))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ${price.toLocaleString()}
            </span>
            {oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Bottom glow line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(--neon-${color})), transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
