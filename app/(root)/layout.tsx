import { ReactNode } from "react";

import { getCurrentUser } from "@/lib/actions/auth.action";
import Header from "@/components/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <main className="w-full">
      <Header user={user} />
      {children}
    </main>
  );
};

export default Layout;