import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, signOut } from "@/lib/actions/auth.action";

import { LogOut } from "lucide-react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  return (
    <div>
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto py-6 px-16 max-sm:px-4 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-xl bg-primary-200/10 group-hover:bg-primary-200/20 transition-colors">
            <Image src="/logo.svg" alt="PrepWise Logo" width={32} height={28} />
          </div>
          <h2 className="text-primary-100 font-bold tracking-tight">PrepWise</h2>
        </Link>

        <div className="flex items-center gap-4">
          {isUserAuthenticated ? (
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-light-100 hover:text-white transition-colors">Home</Link>
              <Link href="/dashboard" className="text-sm font-medium text-light-100 hover:text-white transition-colors">Dashboard</Link>


              <form action={async () => {
                'use server';
                await signOut();
              }}>
                <Button type="submit" variant="ghost" className="text-light-100 hover:text-white hover:bg-destructive-100/10 flex items-center gap-2 px-4 rounded-full border border-transparent hover:border-destructive-100/20">
                  <LogOut className="w-4 h-4 text-destructive-100" />
                  <span>Sign Out</span>
                </Button>
              </form>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-light-100 hover:text-white px-6">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild className="btn-primary shadow-lg shadow-primary-200/10">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      <main className="w-full">
        {children}
      </main>
    </div>
  );
};


export default Layout;

