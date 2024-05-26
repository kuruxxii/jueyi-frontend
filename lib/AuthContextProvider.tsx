"use client";

import { createContext, useState, useEffect, useContext } from "react";

type User = { email: string };

type AuthContext = {
  isAuthenticated: boolean;
  user: User | undefined;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check initial authentication status when the app loads
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/status", {
          credentials: "include",
        });
        const json = await response.json();
        if (json.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(json.user);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
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
