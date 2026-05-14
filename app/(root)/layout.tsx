import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full">
      {children}
    </main>
  );
};

export default Layout;