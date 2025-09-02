// src/context/auth-context.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthState = {
  isAuthenticated: boolean;
  role: string | null;
};

interface AuthContextType extends AuthState {
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: !!localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  useEffect(() => {
    // rehydrate auth from localStorage on first load
    setAuth({
      isAuthenticated: !!localStorage.getItem("token"),
      role: localStorage.getItem("role"),
    });
  }, []);

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ isAuthenticated: true, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ isAuthenticated: false, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
