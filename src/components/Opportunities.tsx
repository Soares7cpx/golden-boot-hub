import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";

const Opportunities = () => {
  const opportunities = [
    {
      club: "EC Juventude",
      category: "Sub-17",
      location: "Caxias do Sul, RS",
      date: "15 de Janeiro, 2025",
      spots: "20 vagas",
      status: "Inscrições Abertas"
    },
    {
      club: "Grêmio FBPA",
      category: "Sub-15",
      location: "Porto Alegre, RS",
      date: "22 de Janeiro, 2025",
      spots: "15 vagas",
      status: "Inscrições Abertas"
    },
    {
      club: "SC Internacional",
      category: "Sub-20",
      location: "Porto Alegre, RS",
      date: "28 de Janeiro, 2025",
      spots: "25 vagas",
      status: "Inscrições Abertas"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Peneiras <span className="text-primary">Disponíveis</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Confira as oportunidades abertas e garanta sua vaga
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <Card key={index} className="hover:shadow-elegant transition-smooth">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl">{opportunity.club}</CardTitle>
                  <Badge className="gradient-accent">{opportunity.status}</Badge>
                </div>
                <p className="text-lg font-semibold text-primary">{opportunity.category}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{opportunity.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{opportunity.spots}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gradient-primary hover:opacity-90 transition-smooth">
                  Inscrever-se Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todas as Peneiras
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
