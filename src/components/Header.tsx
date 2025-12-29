import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Catalog', 'Deals', 'Brands', 'About'];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-neon-cyan/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-2xl font-display font-bold text-gradient">TECHNO</span>
              <span className="text-2xl font-display font-bold text-foreground">MARKET</span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors group">
              <Search size={20} className="text-muted-foreground group-hover:text-neon-cyan transition-colors" />
            </button>

            {/* Wishlist */}
            <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors group hidden sm:flex">
              <Heart size={20} className="text-muted-foreground group-hover:text-neon-magenta transition-colors" />
            </button>

            {/* Account */}
            <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors group hidden sm:flex">
              <User size={20} className="text-muted-foreground group-hover:text-neon-purple transition-colors" />
            </button>

            {/* Cart */}
            <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors group">
              <ShoppingCart size={20} className="text-muted-foreground group-hover:text-neon-cyan transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neon-magenta text-white text-xs font-bold flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link}
                href="#"
                className="px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.3s ease-out ${index * 0.1}s`,
                }}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
