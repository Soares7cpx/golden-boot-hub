import { UserPlus, Search, Trophy, Handshake } from "lucide-react";
import trainingImage from "@/assets/training-field.jpg";

const HowItWorks = () => {
  const stepsAthletes = [
    {
      icon: UserPlus,
      title: "Cadastre-se",
      description: "Crie seu perfil completo com informações e histórico esportivo"
    },
    {
      icon: Search,
      title: "Encontre Peneiras",
      description: "Navegue pelas oportunidades disponíveis na sua região"
    },
    {
      icon: Trophy,
      title: "Inscreva-se",
      description: "Garanta sua vaga nas peneiras que mais combinam com você"
    }
  ];

  const stepsClubs = [
    {
      icon: UserPlus,
      title: "Cadastre seu Clube",
      description: "Registre as informações do clube e categorias de base"
    },
    {
      icon: Search,
      title: "Publique Peneiras",
      description: "Divulgue suas peneiras para milhares de atletas"
    },
    {
      icon: Handshake,
      title: "Encontre Talentos",
      description: "Receba inscrições e descubra os melhores jogadores"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Como <span className="text-secondary">Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simples, rápido e eficiente para atletas e clubes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="text-3xl font-heading font-bold mb-8 text-secondary">Para Atletas</h3>
            <div className="space-y-8">
              {stepsAthletes.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 gradient-secondary rounded-lg flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-heading font-bold mb-8 text-primary">Para Clubes</h3>
            <div className="space-y-8">
              {stepsClubs.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 gradient-accent rounded-lg flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-strong">
          <img 
            src={trainingImage} 
            alt="Treino de futebol profissional" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 gradient-hero flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Pronto para começar sua jornada?
              </h3>
              <p className="text-xl mb-6">
                Junte-se a centenas de atletas e clubes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
