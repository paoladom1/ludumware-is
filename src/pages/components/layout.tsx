import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      <div className="flex w-full h-20 bg-white flex-end">
        {session?.user && (
          <div className="flex w-full">
            <h2 className="w-5/6 text-center align-middle">
              {session.user.name}
            </h2>
            <button className="rounded border w-1/6" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
