import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, MessageSquare, Settings, LogOut, ClipboardList, Briefcase, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import logoSingulari from "@/assets/logo-singulari.png";

interface MainLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/", label: "PDI", icon: ClipboardList },
  { path: "/pei", label: "PEI", icon: FileText },
  { path: "/trabalhos", label: "Trabalhos", icon: Briefcase },
  { path: "/agenda", label: "Agenda", icon: CalendarDays },
  { path: "/mensagens", label: "Mensagens", icon: MessageSquare },
  { path: "/ajustes", label: "Ajustes", icon: Settings },
];

export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={logoSingulari} alt="Singulari" className="h-10 w-auto" />
            </motion.div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "relative gap-2 transition-all duration-200 hover:bg-primary/5",
                      isActive && "text-primary bg-primary/5"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        layoutId="nav-indicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                );
              })}
              
              {/* Separator */}
              <div className="h-6 w-px bg-border/50 mx-1" />
              
              {/* Notifications and Logout */}
              <NotificationsDropdown />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Sair</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 py-6 mt-12">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={logoSingulari} alt="Singulari" className="h-8 w-auto opacity-60" />
          <p className="text-center text-sm text-muted-foreground">
            Acompanhamento atualizado em 22/12/2025
          </p>
        </div>
      </footer>
    </div>
  );
}
