import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PEI from "./pages/PEI";
import Mensagens from "./pages/Mensagens";
import Ajustes from "./pages/Ajustes";
import Trabalhos from "./pages/Trabalhos";
import Agenda from "./pages/Agenda";
import SchoolReports from "./pages/SchoolReports";
import TherapyReports from "./pages/TherapyReports";
import HealthReports from "./pages/HealthReports";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pei"
        element={
          <ProtectedRoute>
            <PEI />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mensagens"
        element={
          <ProtectedRoute>
            <Mensagens />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mensagens/:contactId"
        element={
          <ProtectedRoute>
            <Mensagens />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trabalhos"
        element={
          <ProtectedRoute>
            <Trabalhos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agenda"
        element={
          <ProtectedRoute>
            <Agenda />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ajustes"
        element={
          <ProtectedRoute>
            <Ajustes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/relatorios/escola"
        element={
          <ProtectedRoute>
            <SchoolReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/relatorios/terapias"
        element={
          <ProtectedRoute>
            <TherapyReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/relatorios/saude"
        element={
          <ProtectedRoute>
            <HealthReports />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
