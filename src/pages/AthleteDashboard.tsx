import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, Calendar, MapPin } from "lucide-react";

interface Profile {
  full_name: string;
  email: string;
  user_type: string;
}

interface AthleteProfile {
  id: string;
  position: string | null;
  current_club: string | null;
}

interface Tryout {
  id: string;
  title: string;
  category: string;
  location: string;
  tryout_date: string;
  club_profiles: {
    club_name: string;
  };
}

const AthleteDashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfile | null>(null);
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [loading, setLoading] = useState(true);
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
      
      // Get athlete profile
      const { data: athleteData } = await supabase
        .from("athlete_profiles")
        .select("*")
        .eq("profile_id", user.id)
        .single();
      
      setAthleteProfile(athleteData);
    }

    // Get available tryouts
    const { data: tryoutsData } = await supabase
      .from("tryouts")
      .select(`
        *,
        club_profiles (
          club_name
        )
      `)
      .eq("status", "open")
      .gte("application_deadline", new Date().toISOString().split("T")[0])
      .order("tryout_date", { ascending: true })
      .limit(6);

    if (tryoutsData) {
      setTryouts(tryoutsData);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleApply = async (tryoutId: string) => {
    if (!athleteProfile?.id) {
      toast({
        title: "Complete seu perfil",
        description: "Você precisa completar seu perfil de atleta antes de se inscrever",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("applications")
      .insert({
        tryout_id: tryoutId,
        athlete_id: athleteProfile.id,
      });

    if (error) {
      toast({
        title: "Erro ao se inscrever",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Inscrição realizada!",
        description: "Boa sorte na peneira!",
      });
      checkAuth();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard do Atleta</h1>
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
                  <CardTitle className="text-lg">{profile?.full_name}</CardTitle>
                  <CardDescription>{profile?.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {athleteProfile ? (
                <div className="space-y-2">
                  {athleteProfile.position && (
                    <p className="text-sm"><strong>Posição:</strong> {athleteProfile.position}</p>
                  )}
                  {athleteProfile.current_club && (
                    <p className="text-sm"><strong>Clube Atual:</strong> {athleteProfile.current_club}</p>
                  )}
                  <Button variant="outline" className="w-full mt-4">
                    Completar Perfil
                  </Button>
                </div>
              ) : (
                <Button className="w-full">Criar Perfil de Atleta</Button>
              )}
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Peneiras Disponíveis</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tryouts.map((tryout) => (
                <Card key={tryout.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{tryout.title}</CardTitle>
                        <CardDescription>{tryout.club_profiles.club_name}</CardDescription>
                      </div>
                      <Badge>{tryout.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {tryout.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(tryout.tryout_date).toLocaleDateString("pt-BR")}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleApply(tryout.id)}
                    >
                      Inscrever-se
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {tryouts.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Nenhuma peneira disponível no momento
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;
