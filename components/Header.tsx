"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Home, LogOut, User } from "lucide-react";
import { signOut } from "@/lib/actions/auth.action";

interface UserData {
  id: string;
  name?: string;
  email?: string;
  profileURL?: string;
}

export default function Header({ user }: { user: UserData | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const handleDashboard = () => {
    router.push("/dashboard");
    setIsOpen(false);
  };

  const handleHome = () => {
    router.push("/");
    setIsOpen(false);
  };

  if (!user) return null;

  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-end">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 rounded-full px-2 py-1.5 hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-200 flex items-center justify-center">
              {user.profileURL ? (
                <Image
                  src={user.profileURL}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <span className="text-dark-100 font-bold text-sm">{userInitials}</span>
              )}
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 dark-gradient rounded-xl border border-border shadow-lg overflow-hidden animate-fadeIn">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-light-100 truncate">{user.name}</p>
                <p className="text-xs text-light-400 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleHome}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-light-100 hover:bg-white/5 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Home
                </button>
                <button
                  onClick={handleDashboard}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-light-100 hover:bg-white/5 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive-100 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}