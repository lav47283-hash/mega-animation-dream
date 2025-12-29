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
              ТЕХНОМАРКЕТ
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Лучший магазин компьютерной техники и комплектующих. Работаем с 2019 года.
            </p>
            <div className="space-y-2">
              <a href="tel:+74951234567" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm">
                <Phone size={16} />
                +7 (495) 123-45-67
              </a>
              <a href="mailto:info@technomarket.ru" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm">
                <Mail size={16} />
                info@technomarket.ru
              </a>
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={16} />
                Москва, ул. Примерная, 42
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Каталог</h4>
            <div className="flex flex-col gap-2">
              {['Видеокарты', 'Процессоры', 'Материнские платы', 'SSD накопители', 'Охлаждение'].map((link) => (
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
            <h4 className="font-display font-bold text-foreground mb-4">Покупателям</h4>
            <div className="flex flex-col gap-2">
              {['Доставка и оплата', 'Гарантия', 'Возврат товара', 'Акции', 'Отзывы'].map((link) => (
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
            <h4 className="font-display font-bold text-foreground mb-4">Подписка</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Получайте уведомления о скидках и новинках
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
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
                Спасибо за подписку!
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 ТЕХНОМАРКЕТ. Все права защищены.
          </p>
          <div className="flex gap-6">
            {['Политика конфиденциальности', 'Пользовательское соглашение'].map((link) => (
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
