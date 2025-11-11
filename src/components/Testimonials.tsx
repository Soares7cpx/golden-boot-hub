import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Atleta - Assinou com o Santos FC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    text: "Graças ao PeneirasFutebol, consegui a oportunidade que tanto sonhava. O processo foi transparente e profissional. Hoje estou nas categorias de base do Santos!",
    rating: 5
  },
  {
    id: 2,
    name: "Maria Oliveira",
    role: "Mãe de atleta",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    text: "Como mãe, me sentia perdida procurando oportunidades para meu filho. Este site facilitou tudo! Encontramos peneiras sérias e confiáveis. Muito obrigada!",
    rating: 5
  },
  {
    id: 3,
    name: "João Mendes",
    role: "Atleta - Base do Palmeiras",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    text: "Participei de 3 peneiras através da plataforma. A terceira foi a que deu certo! Hoje treino com a base do Palmeiras. Realizei meu sonho!",
    rating: 5
  },
  {
    id: 4,
    name: "Ana Paula Santos",
    role: "Atleta - Futebol Feminino",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    text: "Finalmente um espaço que também valoriza o futebol feminino! Consegui contato com vários clubes e hoje jogo profissionalmente. Gratidão eterna!",
    rating: 5
  },
  {
    id: 5,
    name: "Roberto Costa",
    role: "Dirigente do EC Bahia",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    text: "Como clube, encontramos talentos incríveis através desta plataforma. O processo de triagem é eficiente e nos conecta com atletas realmente comprometidos.",
    rating: 5
  },
  {
    id: 6,
    name: "Pedro Almeida",
    role: "Pai de atleta",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    text: "Economizamos tempo e dinheiro. Antes íamos em peneiras falsas. Aqui todas são verificadas. Meu filho foi aprovado no Fluminense!",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Histórias de <span className="text-primary">Sucesso</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que atletas, famílias e clubes dizem sobre o PeneirasFutebol
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};