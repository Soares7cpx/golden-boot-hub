import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, Plus, Calendar, Users } from "lucide-react";

interface Profile {
  full_name: string;
  email: string;
}

interface ClubProfile {
  id: string;
  club_name: string;
  city: string;
  state: string;
}

interface Tryout {
  id: string;
  title: string;
  category: string;
  tryout_date: string;
  total_spots: number;
  available_spots: number;
  status: string;
}

const ClubDashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [clubProfile, setClubProfile] = useState<ClubProfile | null>(null);
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [tryoutDate, setTryoutDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [spots, setSpots] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    // Get profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
      
      // Get club profile
      const { data: clubData } = await supabase
        .from("club_profiles")
        .select("*")
        .eq("profile_id", user.id)
        .single();
      
      setClubProfile(clubData);

      if (clubData) {
        // Get club tryouts
        const { data: tryoutsData } = await supabase
          .from("tryouts")
          .select("*")
          .eq("club_id", clubData.id)
          .order("tryout_date", { ascending: false });

        if (tryoutsData) {
          setTryouts(tryoutsData);
        }
      }
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleCreateTryout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clubProfile?.id) {
      toast({
        title: "Complete seu perfil",
        description: "Você precisa completar seu perfil de clube antes de criar peneiras",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("tryouts")
      .insert({
        club_id: clubProfile.id,
        title,
        description,
        category,
        location,
        tryout_date: tryoutDate,
        application_deadline: deadline,
        total_spots: parseInt(spots),
        available_spots: parseInt(spots),
        status: "open",
      });

    if (error) {
      toast({
        title: "Erro ao criar peneira",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Peneira criada!",
        description: "Sua peneira foi publicada com sucesso",
      });
      setDialogOpen(false);
      checkAuth();
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setTryoutDate("");
      setDeadline("");
      setSpots("");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard do Clube</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{clubProfile?.club_name || profile?.full_name}</CardTitle>
                  <CardDescription>{profile?.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {clubProfile ? (
                <div className="space-y-2">
                  <p className="text-sm"><strong>Cidade:</strong> {clubProfile.city}</p>
                  <p className="text-sm"><strong>Estado:</strong> {clubProfile.state}</p>
                  <Button variant="outline" className="w-full mt-4">
                    Editar Perfil
                  </Button>
                </div>
              ) : (
                <Button className="w-full">Criar Perfil do Clube</Button>
              )}
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Minhas Peneiras</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Peneira
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Peneira</DialogTitle>
                    <DialogDescription>
                      Preencha as informações da peneira que deseja divulgar
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateTryout} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                          id="category"
                          placeholder="Ex: Sub-17"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Local</Label>
                      <Input
                        id="location"
                        placeholder="Cidade, Estado"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tryout-date">Data da Peneira</Label>
                        <Input
                          id="tryout-date"
                          type="date"
                          value={tryoutDate}
                          onChange={(e) => setTryoutDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Prazo de Inscrição</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="spots">Vagas Disponíveis</Label>
                        <Input
                          id="spots"
                          type="number"
                          min="1"
                          value={spots}
                          onChange={(e) => setSpots(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Criar Peneira
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {tryouts.map((tryout) => (
                <Card key={tryout.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{tryout.title}</CardTitle>
                        <CardDescription>{tryout.category}</CardDescription>
                      </div>
                      <Badge variant={tryout.status === "open" ? "default" : "secondary"}>
                        {tryout.status === "open" ? "Aberta" : "Fechada"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(tryout.tryout_date).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {tryout.available_spots} de {tryout.total_spots} vagas disponíveis
                    </div>
                    <Button variant="outline" className="w-full">
                      Ver Inscritos
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {tryouts.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Você ainda não criou nenhuma peneira
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;
