import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const FooterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative py-16 px-4 border-t border-border/50">
      {/* Background effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
        style={{
          background: 'linear-gradient(to top, hsl(185, 100%, 50%, 0.1), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gradient mb-4">
              TECHNOMARKET
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The best computer hardware and components store. In business since 2019.
            </p>
            <div className="space-y-2">
              <a href="tel:+18001234567" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm">
                <Phone size={16} />
                +1 (800) 123-4567
              </a>
              <a href="mailto:info@technomarket.com" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm">
                <Mail size={16} />
                info@technomarket.com
              </a>
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={16} />
                New York, NY 10001
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Catalog</h4>
            <div className="flex flex-col gap-2">
              {['Graphics Cards', 'Processors', 'Motherboards', 'SSD Storage', 'Cooling'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Customer Service</h4>
            <div className="flex flex-col gap-2">
              {['Shipping & Payment', 'Warranty', 'Returns', 'Deals', 'Reviews'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get notified about deals and new arrivals
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: isSubscribed 
                    ? 'hsl(var(--neon-cyan))' 
                    : 'linear-gradient(135deg, hsl(var(--neon-cyan) / 0.2), transparent)',
                  border: '1px solid hsl(var(--neon-cyan) / 0.3)',
                }}
              >
                <Send size={16} className={isSubscribed ? 'text-background' : 'text-neon-cyan'} />
              </button>
            </div>
            {isSubscribed && (
              <p className="text-neon-cyan text-sm mt-2 animate-fade-in">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 TECHNOMARKET. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
