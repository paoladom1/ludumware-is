import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

import Navbar from "./navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      {session && <Navbar />}
      <div className="w-full mt-8">{children}</div>
    </div>
  );
};

export default Layout;
