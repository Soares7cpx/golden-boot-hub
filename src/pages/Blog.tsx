import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const articles = [
    {
      title: "Como se Preparar para uma Peneira de Futebol",
      excerpt: "Descubra as melhores práticas para se destacar em uma peneira e aumentar suas chances de aprovação.",
      category: "Dicas",
      date: "15 de Janeiro, 2025",
      author: "João Silva",
      image: "/placeholder.svg"
    },
    {
      title: "Documentos Necessários para Peneiras",
      excerpt: "Lista completa de documentos que você precisa levar para garantir sua participação sem problemas.",
      category: "Orientações",
      date: "12 de Janeiro, 2025",
      author: "Maria Santos",
      image: "/placeholder.svg"
    },
    {
      title: "Alimentação para Jovens Atletas",
      excerpt: "Entenda a importância da nutrição adequada para melhorar seu desempenho nos treinos e peneiras.",
      category: "Saúde",
      date: "10 de Janeiro, 2025",
      author: "Carlos Oliveira",
      image: "/placeholder.svg"
    },
    {
      title: "Diferenças Entre Categorias de Base",
      excerpt: "Conheça as particularidades de cada categoria e qual é a mais adequada para você.",
      category: "Informação",
      date: "08 de Janeiro, 2025",
      author: "João Silva",
      image: "/placeholder.svg"
    },
    {
      title: "Histórias de Sucesso: Do Amador ao Profissional",
      excerpt: "Conheça atletas que começaram em peneiras e hoje brilham em clubes profissionais.",
      category: "Inspiração",
      date: "05 de Janeiro, 2025",
      author: "Maria Santos",
      image: "/placeholder.svg"
    },
    {
      title: "Treino Físico para Melhorar seu Desempenho",
      excerpt: "Exercícios específicos que todo jovem atleta deve incluir na sua rotina de preparação.",
      category: "Treino",
      date: "03 de Janeiro, 2025",
      author: "Carlos Oliveira",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["Todos", "Dicas", "Orientações", "Saúde", "Treino", "Inspiração", "Informação"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Dicas, orientações e novidades do mundo do futebol de base
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-muted border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-elegant transition-smooth cursor-pointer group">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">{article.category}</Badge>
                  <CardTitle className="font-heading group-hover:text-primary transition-smooth">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-smooth">
                      Ler mais <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Receba Novidades
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inscreva-se para receber dicas exclusivas e novidades diretamente no seu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-md border border-input bg-background"
            />
            <button className="px-8 py-3 gradient-secondary text-white font-semibold rounded-md hover:opacity-90 transition-smooth">
              Inscrever
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
