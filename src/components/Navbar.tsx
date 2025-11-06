import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { role } = useUserRole();

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/about", label: "Sobre Nós" },
    { href: "/opportunities", label: "Peneiras" },
    { href: "/featured-athletes", label: "Atletas em Destaque" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-heading font-bold text-primary">PeneirasFutebol</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-smooth hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {role ? (
              <Button asChild variant="default">
                <Link to={
                  role === 'admin' ? '/dashboard/admin' : 
                  role === 'club' ? '/dashboard/club' : 
                  '/dashboard/athlete'
                }>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild className="gradient-secondary">
                  <Link to="/auth">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-smooth hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {role ? (
                  <Button asChild variant="default" onClick={() => setIsOpen(false)}>
                    <Link to={
                      role === 'admin' ? '/dashboard/admin' : 
                      role === 'club' ? '/dashboard/club' : 
                      '/dashboard/athlete'
                    }>
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                      <Link to="/auth">Login</Link>
                    </Button>
                    <Button asChild className="gradient-secondary" onClick={() => setIsOpen(false)}>
                      <Link to="/auth">Cadastrar</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
