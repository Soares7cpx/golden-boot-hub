import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TryoutFilters, FilterState } from "@/components/TryoutFilters";
import { TryoutCalendar } from "@/components/TryoutCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data - Em produção, viria do Supabase
const mockTryouts = [
  {
    id: "1",
    title: "Peneira Santos FC",
    club: "Santos FC",
    tryout_date: "2025-01-25",
    date: new Date(2025, 0, 25),
    category: "Sub-17",
    status: "Vagas Abertas",
    city: "Santos",
    state: "SP",
    spots: 30,
    description: "Peneira oficial para categorias de base do Santos FC"
  },
  {
    id: "2",
    title: "Peneira São Paulo FC",
    club: "São Paulo FC",
    tryout_date: "2025-01-28",
    date: new Date(2025, 0, 28),
    category: "Sub-15",
    status: "Vagas Abertas",
    city: "São Paulo",
    state: "SP",
    spots: 25,
    description: "Avaliação para base do Tricolor Paulista"
  },
  {
    id: "3",
    title: "Peneira Palmeiras",
    club: "SE Palmeiras",
    tryout_date: "2025-02-05",
    date: new Date(2025, 1, 5),
    category: "Sub-20",
    status: "Vagas Abertas",
    city: "São Paulo",
    state: "SP",
    spots: 20,
    description: "Seleção para equipe sub-20"
  },
  {
    id: "4",
    title: "Peneira Corinthians",
    club: "SC Corinthians",
    tryout_date: "2025-02-12",
    date: new Date(2025, 1, 12),
    category: "Sub-17",
    status: "Vagas Limitadas",
    city: "São Paulo",
    state: "SP",
    spots: 5,
    description: "Últimas vagas para peneira do Timão"
  }
];

const OpportunitiesPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "",
    state: "",
    category: "",
    status: "",
    dateFrom: "",
    dateTo: ""
  });

  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  // Filtrar peneiras baseado nos filtros
  const filteredTryouts = mockTryouts.filter((tryout) => {
    if (filters.search && !tryout.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !tryout.club.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.city && tryout.city !== filters.city) return false;
    if (filters.state && tryout.state !== filters.state) return false;
    if (filters.category && tryout.category !== filters.category) return false;
    if (filters.status && tryout.status !== filters.status) return false;
    if (filters.dateFrom && tryout.date < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && tryout.date > new Date(filters.dateTo)) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Todas as <span className="text-primary">Peneiras</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encontre as melhores oportunidades para mostrar seu talento
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8">
            <TryoutFilters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Toggle de visualização */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "calendar")} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Lista
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendário
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTryouts.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      Nenhuma peneira encontrada com os filtros selecionados.
                    </p>
                  </div>
                ) : (
                  filteredTryouts.map((tryout) => (
                    <Card key={tryout.id} className="hover:shadow-elegant transition-smooth">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={tryout.status === "Vagas Abertas" ? "default" : "secondary"}>
                            {tryout.status}
                          </Badge>
                          <Badge variant="outline">{tryout.category}</Badge>
                        </div>
                        <CardTitle className="text-xl">{tryout.club}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {tryout.city}, {tryout.state}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {format(tryout.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {tryout.spots} vagas disponíveis
                        </div>
                        <p className="text-sm text-muted-foreground pt-2">
                          {tryout.description}
                        </p>
                        <Button className="w-full mt-4">Inscrever-se</Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-8">
              <TryoutCalendar tryouts={filteredTryouts} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OpportunitiesPage;
