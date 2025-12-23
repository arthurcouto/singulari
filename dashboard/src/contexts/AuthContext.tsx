import { createContext, useContext, useState, ReactNode } from "react";

interface ChildData {
  name: string;
  birthDate: string;
  age: string;
  school: string;
  grade: string;
  responsible: string;
  phone: string;
  photoUrl?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (cpf: string, password: string) => boolean;
  logout: () => void;
  childData: ChildData;
  updateChildData: (data: Partial<ChildData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_CPF = "14862574700";
const VALID_PASSWORD = "123456";

const initialChildData: ChildData = {
  name: "Lucas Oliveira Silva",
  birthDate: "15/03/2014",
  age: "10 anos",
  school: "Colégio Santa Maria",
  grade: "5º Ano",
  responsible: "Ana Paula Silva",
  phone: "(11) 99999-8888",
  photoUrl: undefined,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [childData, setChildData] = useState<ChildData>(initialChildData);

  const login = (cpf: string, password: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf === VALID_CPF && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateChildData = (data: Partial<ChildData>) => {
    setChildData((prev) => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, childData, updateChildData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
