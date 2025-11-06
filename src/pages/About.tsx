import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Conectar talentos do futebol de base com oportunidades reais em clubes profissionais, facilitando o caminho para a realização de sonhos."
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser a principal plataforma de descoberta de talentos do futebol brasileiro, reconhecida pela transparência e eficiência."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Transparência, compromisso com o atleta, respeito ao futebol de base, inovação e ética em todas as relações."
    }
  ];

  const team = [
    {
      name: "João Silva",
      role: "Fundador e CEO",
      description: "Ex-jogador profissional com 15 anos de experiência no futebol de base."
    },
    {
      name: "Maria Santos",
      role: "Diretora de Relacionamento",
      description: "Especialista em gestão esportiva com network em mais de 50 clubes."
    },
    {
      name: "Carlos Oliveira",
      role: "Coordenador de Peneiras",
      description: "Olheiro profissional há 10 anos, descobriu diversos talentos para clubes da série A."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Sobre Nós
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Conectamos jovens talentos às melhores oportunidades de peneiras e clubes do futebol de base
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">
              Nossa História
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                O PeneirasFutebol nasceu da vontade de transformar a realidade de milhares de jovens atletas que sonham em se tornar jogadores profissionais. Sabemos que o talento está espalhado por todo o Brasil, mas muitas vezes falta informação e oportunidade.
              </p>
              <p>
                Fundada por profissionais com vasta experiência no futebol de base, nossa plataforma surge para democratizar o acesso às peneiras e criar uma ponte direta entre atletas talentosos e clubes que buscam novos talentos.
              </p>
              <p>
                Acreditamos no poder do futebol de base e no potencial de cada jovem atleta. Por isso, trabalhamos incansavelmente para garantir que as informações sobre peneiras sejam confiáveis, atualizadas e acessíveis a todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
            Nossa Equipe
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-8 text-center">
                  <div className="w-24 h-24 bg-gradient-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Faça Parte Dessa História
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de atletas e clubes que já confiam em nossa plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth">
              <button className="px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-white/90 transition-smooth">
                Começar Agora
              </button>
            </a>
            <a href="/contact">
              <button className="px-8 py-3 bg-white/20 text-white font-semibold rounded-md hover:bg-white/30 transition-smooth border-2 border-white">
                Entre em Contato
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
