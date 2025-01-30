"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UtilsService } from "@/presentation/services/utils.service";
import { IUserRole } from "@/presentation/types/interfaces";

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  userRole: IUserRole["role"] | null;
  login: (
    tokens: { acToken: string; rfToken: string },
    role: IUserRole["role"]
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<IUserRole["role"] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokens = UtilsService.getToken();
    const savedRole = UtilsService.getRole();
    if (tokens?.acToken) {
      setAccessToken(tokens.acToken);
      setUserRole(savedRole);
      setIsAuthenticated(true);
    } else {
      setAccessToken(null);
      setUserRole(null);
      setIsAuthenticated(false);
      router.replace("/auth");
    }
  }, [router]);

  const login = (
    tokens: { acToken: string; rfToken: string },
    role: IUserRole["role"]
  ) => {
    UtilsService.setToken(tokens);
    UtilsService.setRole(role);
    setAccessToken(tokens.acToken);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    UtilsService.removeToken();
    UtilsService.removeRole();
    setAccessToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
    router.replace("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, userRole, login, logout }}
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
