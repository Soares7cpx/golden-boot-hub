import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Blog from "./pages/Blog";
import FeaturedAthletes from "./pages/FeaturedAthletes";
import Contact from "./pages/Contact";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import AthleteDashboard from "./pages/AthleteDashboard";
import ClubDashboard from "./pages/ClubDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/featured-athletes" element={<FeaturedAthletes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route 
            path="/dashboard/athlete" 
            element={
              <ProtectedRoute requiredRole="athlete">
                <AthleteDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/club" 
            element={
              <ProtectedRoute requiredRole="club">
                <ClubDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
