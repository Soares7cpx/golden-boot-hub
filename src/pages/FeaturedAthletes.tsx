import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, MapPin, Calendar } from "lucide-react";

const FeaturedAthletes = () => {
  const athletes = [
    {
      name: "Pedro Henrique",
      position: "Atacante",
      age: 17,
      currentClub: "EC Juventude",
      achievements: "Artilheiro do Campeonato Gaúcho Sub-17",
      location: "Caxias do Sul, RS",
      approvedDate: "Novembro 2024",
      stats: { goals: 23, assists: 8, games: 30 }
    },
    {
      name: "Lucas Martins",
      position: "Meio-Campo",
      age: 16,
      currentClub: "Grêmio FBPA",
      achievements: "Melhor jogador da Copa Sul Sub-16",
      location: "Porto Alegre, RS",
      approvedDate: "Outubro 2024",
      stats: { goals: 12, assists: 15, games: 28 }
    },
    {
      name: "Gabriel Silva",
      position: "Zagueiro",
      age: 18,
      currentClub: "SC Internacional",
      achievements: "Capitão da Seleção Gaúcha Sub-18",
      location: "Porto Alegre, RS",
      approvedDate: "Setembro 2024",
      stats: { goals: 3, assists: 2, games: 32 }
    },
    {
      name: "Rafael Santos",
      position: "Lateral-Direito",
      age: 17,
      currentClub: "Caxias FC",
      achievements: "Revelação do Gauchão Sub-17",
      location: "Caxias do Sul, RS",
      approvedDate: "Agosto 2024",
      stats: { goals: 5, assists: 11, games: 25 }
    },
    {
      name: "Matheus Costa",
      position: "Goleiro",
      age: 16,
      currentClub: "Brasil de Pelotas",
      achievements: "Menor índice de gols sofridos da categoria",
      location: "Pelotas, RS",
      approvedDate: "Julho 2024",
      stats: { goals: 0, assists: 0, games: 27 }
    },
    {
      name: "João Victor",
      position: "Volante",
      age: 18,
      currentClub: "Ypiranga FC",
      achievements: "Destaque da Copa FGF Sub-18",
      location: "Erechim, RS",
      approvedDate: "Junho 2024",
      stats: { goals: 8, assists: 6, games: 29 }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <Trophy className="h-16 w-16 mx-auto mb-6 text-accent" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Atletas em Destaque
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Conheça os talentos que conquistaram suas vagas através da nossa plataforma
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-secondary mb-2">150+</div>
              <div className="text-muted-foreground">Atletas Aprovados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-2">45+</div>
              <div className="text-muted-foreground">Clubes Parceiros</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-accent mb-2">89%</div>
              <div className="text-muted-foreground">Taxa de Sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-secondary mb-2">12</div>
              <div className="text-muted-foreground">Estados Atendidos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Athletes Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {athletes.map((athlete, index) => (
              <Card key={index} className="hover:shadow-elegant transition-smooth">
                <div className="aspect-square bg-gradient-secondary overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Trophy className="h-16 w-16" />
                      </div>
                      <Badge className="bg-accent text-accent-foreground">{athlete.position}</Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">{athlete.name}</h3>
                  <p className="text-muted-foreground mb-4">{athlete.currentClub}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{athlete.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Aprovado em {athlete.approvedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span>{athlete.achievements}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-heading font-bold text-secondary">{athlete.stats.goals}</div>
                        <div className="text-xs text-muted-foreground">Gols</div>
                      </div>
                      <div>
                        <div className="text-2xl font-heading font-bold text-primary">{athlete.stats.assists}</div>
                        <div className="text-xs text-muted-foreground">Assistências</div>
                      </div>
                      <div>
                        <div className="text-2xl font-heading font-bold text-accent">{athlete.stats.games}</div>
                        <div className="text-xs text-muted-foreground">Jogos</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Você Pode Ser o Próximo!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cadastre-se agora e comece sua jornada rumo ao futebol profissional
          </p>
          <a href="/auth">
            <button className="px-8 py-4 bg-white text-primary font-heading font-bold rounded-md hover:bg-white/90 transition-smooth text-lg shadow-strong">
              Começar Agora
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturedAthletes;
