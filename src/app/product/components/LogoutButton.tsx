"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authService } from "@/services/auth.service";

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Logout"
      title="Logout"
      className={
        className ||
        "inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 sm:px-3.5"
      }
    >
      <LogOut className="h-3.5 w-3.5 text-zinc-500" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
