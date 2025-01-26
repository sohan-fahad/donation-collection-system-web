"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UtilsService } from "@/presentation/services/utils.service";

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (tokens: { acToken: string; rfToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokens = UtilsService.getToken();
    if (tokens?.acToken) {
      setAccessToken(tokens.acToken);
      setIsAuthenticated(true);
    } else {
      setAccessToken(null);
      setIsAuthenticated(false);
      router.replace("/auth");
    }
  }, [router]);

  const login = (tokens: { acToken: string; rfToken: string }) => {
    UtilsService.setToken(tokens);
    setAccessToken(tokens.acToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    UtilsService.removeToken();
    setAccessToken(null);
    setIsAuthenticated(false);
    router.replace("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
