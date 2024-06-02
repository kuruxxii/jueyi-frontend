"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = { email: string; endDate: string };

type AuthContext = {
  isAuthenticated: boolean;
  user: User | undefined;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const logout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        credentials: "include",
      });
      setIsAuthenticated(false);
      setUser(undefined);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Check initial authentication status when the app loads
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/status", {
          credentials: "include",
        });
        const json = await response.json();
        if (response.ok) {
          setIsAuthenticated(json.isAuthenticated);
          setUser(json.user);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, [toast]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}
