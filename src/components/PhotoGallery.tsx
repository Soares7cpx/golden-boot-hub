import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    title: "Peneira Sub-17 em São Paulo",
    category: "Eventos"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
    title: "Treino técnico com jovens talentos",
    category: "Treinos"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
    title: "Jovem atleta em ação",
    category: "Atletas"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800",
    title: "Trabalho em equipe durante avaliação",
    category: "Treinos"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800",
    title: "Comemoração após aprovação",
    category: "Momentos"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800",
    title: "Campo profissional para peneiras",
    category: "Infraestrutura"
  }
];

export const PhotoGallery = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Galeria de <span className="text-primary">Momentos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Registros reais dos nossos eventos e dos atletas que passaram por aqui
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Card key={image.id} className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">{image.title}</h3>
                    <Badge variant="secondary">{image.category}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};