import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Building2, Calendar, UserPlus, LogOut, Shield } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAthletes: 0,
    totalClubs: 0,
    totalTryouts: 0,
    totalApplications: 0
  });
  const [tryouts, setTryouts] = useState<any[]>([]);
  const [athletes, setAthletes] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load stats
      const [athletesRes, clubsRes, tryoutsRes, applicationsRes] = await Promise.all([
        supabase.from('athlete_profiles').select('id', { count: 'exact', head: true }),
        supabase.from('club_profiles').select('id', { count: 'exact', head: true }),
        supabase.from('tryouts').select('id', { count: 'exact', head: true }),
        supabase.from('applications').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        totalAthletes: athletesRes.count || 0,
        totalClubs: clubsRes.count || 0,
        totalTryouts: tryoutsRes.count || 0,
        totalApplications: applicationsRes.count || 0
      });

      // Load recent tryouts
      const { data: tryoutsData } = await supabase
        .from('tryouts')
        .select(`
          *,
          club_profiles(club_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      setTryouts(tryoutsData || []);

      // Load athletes with profiles
      const { data: athletesData } = await supabase
        .from('athlete_profiles')
        .select(`
          *,
          profiles(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      setAthletes(athletesData || []);

      // Load clubs
      const { data: clubsData } = await supabase
        .from('club_profiles')
        .select(`
          *,
          profiles(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      setClubs(clubsData || []);

    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do painel.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando painel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-heading font-bold">Painel Administrativo</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Atletas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-secondary">{stats.totalAthletes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Clubes</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-primary">{stats.totalClubs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peneiras Ativas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-accent">{stats.totalTryouts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Inscrições</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tryouts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tryouts">Peneiras</TabsTrigger>
            <TabsTrigger value="athletes">Atletas</TabsTrigger>
            <TabsTrigger value="clubs">Clubes</TabsTrigger>
          </TabsList>

          <TabsContent value="tryouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Peneiras Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Clube</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Vagas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tryouts.map((tryout) => (
                      <TableRow key={tryout.id}>
                        <TableCell className="font-medium">{tryout.title}</TableCell>
                        <TableCell>{tryout.club_profiles?.club_name}</TableCell>
                        <TableCell>{tryout.category}</TableCell>
                        <TableCell>{new Date(tryout.tryout_date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <Badge variant={tryout.status === 'open' ? 'default' : 'secondary'}>
                            {tryout.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{tryout.available_spots}/{tryout.total_spots}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="athletes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Atletas Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Posição</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>Data de Cadastro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {athletes.map((athlete) => (
                      <TableRow key={athlete.id}>
                        <TableCell className="font-medium">{athlete.profiles?.full_name}</TableCell>
                        <TableCell>{athlete.profiles?.email}</TableCell>
                        <TableCell>{athlete.position || '-'}</TableCell>
                        <TableCell>
                          {athlete.date_of_birth 
                            ? Math.floor((new Date().getTime() - new Date(athlete.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
                            : '-'
                          }
                        </TableCell>
                        <TableCell>{new Date(athlete.created_at).toLocaleDateString('pt-BR')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clubs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Clubes Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Clube</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Cidade</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clubs.map((club) => (
                      <TableRow key={club.id}>
                        <TableCell className="font-medium">{club.club_name}</TableCell>
                        <TableCell>{club.profiles?.full_name}</TableCell>
                        <TableCell>{club.profiles?.email}</TableCell>
                        <TableCell>{club.city}</TableCell>
                        <TableCell>{club.state}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
