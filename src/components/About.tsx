import { Trophy, Users, Target } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Trophy,
      title: "Oportunidades Reais",
      description: "Peneiras verificadas de clubes profissionais e categorias de base"
    },
    {
      icon: Users,
      title: "Conexão Direta",
      description: "Aproximamos atletas talentosos dos clubes que buscam novos talentos"
    },
    {
      icon: Target,
      title: "Futebol de Base",
      description: "Valorizamos e promovemos o desenvolvimento das categorias de base"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Impulsionando o <span className="text-primary">Futebol de Base</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa plataforma é dedicada a revelar novos talentos e fortalecer a base do futebol brasileiro
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-strong transition-smooth hover:-translate-y-1"
            >
              <div className="w-16 h-16 gradient-secondary rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
