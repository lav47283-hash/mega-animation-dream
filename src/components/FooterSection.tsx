import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="relative py-20 px-4 border-t border-border/50">
      {/* Background effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
        style={{
          background: 'linear-gradient(to top, hsl(185, 100%, 50%, 0.1), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gradient mb-4">
              CREATIVE
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Создаём невероятные цифровые впечатления с любовью к деталям и страстью к инновациям.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-foreground mb-2">Навигация</h4>
            {['Главная', 'Возможности', 'Галерея', 'Контакты'].map((link, i) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-neon-cyan transition-colors duration-300 story-link inline-block w-fit"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Социальные сети</h4>
            <div className="flex gap-4">
              {[
                { icon: Github, color: 'cyan' },
                { icon: Twitter, color: 'magenta' },
                { icon: Linkedin, color: 'purple' },
              ].map(({ icon: Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border border-border/50 hover:border-neon-${color}/50 transition-all duration-300 hover:transform hover:scale-110 hover:-translate-y-1 group`}
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--neon-${color}) / 0.1), transparent)`,
                  }}
                >
                  <Icon 
                    size={20} 
                    className={`text-muted-foreground group-hover:text-neon-${color} transition-colors duration-300`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Creative Experience. Все права защищены.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Создано с <Heart size={16} className="text-neon-magenta animate-pulse" /> и анимациями
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
