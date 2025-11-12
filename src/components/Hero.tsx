import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-soccer.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in">
          Sua Chance de Brilhar<br />nos Gramados
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
          Conectamos talentos do futebol de base com as melhores oportunidades em clubes profissionais
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg" 
            className="text-lg gradient-accent hover:opacity-90 transition-smooth shadow-strong"
          >
            <Link to="/opportunities">
              Ver Peneiras Disponíveis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="secondary" 
            className="text-lg bg-white/10 text-white border border-white/20 hover:bg-white/20"
          >
            <Link to="/auth">
              Cadastrar Clube
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
