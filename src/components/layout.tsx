import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

import Navbar from "@/components/navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      {session && <Navbar />}
      <div className="container mx-auto pt-4">{children}</div>
    </div>
  );
};

export default Layout;
