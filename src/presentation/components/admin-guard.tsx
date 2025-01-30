"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./context/auth-context";

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && userRole !== "admin") {
      router.replace("/unauthorized"); // or any other route for unauthorized access
    }
  }, [isAuthenticated, userRole, router]);

  if (!isAuthenticated || userRole !== "admin") {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};
