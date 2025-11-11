import { Shield, CheckCircle, Lock, Users, Award, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const badges = [
  {
    id: 1,
    icon: Shield,
    title: "100% Verificado",
    description: "Todas as peneiras são verificadas pela nossa equipe"
  },
  {
    id: 2,
    icon: Lock,
    title: "Dados Seguros",
    description: "Seus dados pessoais protegidos por criptografia"
  },
  {
    id: 3,
    icon: CheckCircle,
    title: "Clubes Oficiais",
    description: "Apenas peneiras de clubes registrados e verificados"
  },
  {
    id: 4,
    icon: Users,
    title: "+10.000 Atletas",
    description: "Milhares de atletas já confiaram em nossa plataforma"
  },
  {
    id: 5,
    icon: Award,
    title: "Taxa de Sucesso",
    description: "35% dos inscritos conseguem aprovação"
  },
  {
    id: 6,
    icon: FileCheck,
    title: "Transparência Total",
    description: "Processo claro e sem taxas ocultas"
  }
];

export const TrustBadges = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Por Que <span className="text-primary">Confiar</span> em Nós?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprometidos com a segurança, transparência e sucesso dos nossos atletas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Card key={badge.id} className="border-2 hover:border-primary transition-smooth">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{badge.title}</h3>
                  <p className="text-muted-foreground">{badge.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-muted rounded-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Nosso Compromisso</h3>
            <p className="text-muted-foreground mb-6">
              No PeneirasFutebol, acreditamos que todo atleta merece uma chance justa e transparente 
              de mostrar seu talento. Por isso, verificamos cada peneira, protegemos seus dados e 
              garantimos que você tenha acesso apenas a oportunidades legítimas.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Sem golpes ou fraudes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Suporte dedicado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Processo transparente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
