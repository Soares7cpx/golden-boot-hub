import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4 text-accent">PeneirasFutebol</h3>
            <p className="text-primary-foreground/80">
              Conectando talentos do futebol de base com as melhores oportunidades
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Sobre Nós</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Peneiras</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Para Clubes</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-primary-foreground/80">
                <Mail className="h-5 w-5 mr-2" />
                contato@peneiras.com
              </li>
              <li className="flex items-center text-primary-foreground/80">
                <Phone className="h-5 w-5 mr-2" />
                (11) 9999-9999
              </li>
              <li className="flex items-center text-primary-foreground/80">
                <MapPin className="h-5 w-5 mr-2" />
                São Paulo, SP
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 PeneirasFutebol. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
