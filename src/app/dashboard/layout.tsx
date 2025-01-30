"use client";
import { AdminGuard } from "@/presentation/components/admin-guard";
import { useAuth } from "@/presentation/components/context/auth-context";
import { Button } from "@/presentation/components/ui/button";
import Text from "@/presentation/components/ui/text";
import { cn } from "@/presentation/lib/utils";
import { UtilsService } from "@/presentation/services/utils.service";
import { HelpingHandIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useAuth();

  // const logout = () => {
  //  logout();
  // };
  return (
    <>
      <AdminGuard>
        <div className="min-h-screen w-full flex">
          <div className="h-screen lg:w-[300px] pt-16 px-4 space-y-4">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-2 hover:text-blue-500",
                pathname === "/dashboard" ? "text-blue-500" : "text-black"
              )}
            >
              <HomeIcon size={24} />
              <Text className="text-current">Home</Text>
            </Link>

            <Link
              href="/dashboard/donation-list"
              className={cn(
                "flex items-center gap-2 hover:text-blue-500",
                pathname === "/dashboard/donation-list"
                  ? "text-blue-500"
                  : "text-black"
              )}
            >
              <HelpingHandIcon size={24} />
              <Text className="text-current">Donation</Text>
            </Link>
          </div>
          <div className="w-full">
            <div className="bg-background shadow">
              <div className="container mx-auto h-16 flex justify-between items-center">
                <Text variant="heading4">Logo</Text>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </AdminGuard>
    </>
  );
}
