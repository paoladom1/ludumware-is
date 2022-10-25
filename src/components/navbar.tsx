import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession({ required: true });

  return (
    <nav className="bg-white sm:px-4 py-4 dark:bg-gray-900 w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600 mb-8">
      <div className="flex flex-wrap justify-between items-center px-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Ludumware
          </span>
        </a>
        <div className="flex md:order-2 align-center h-full">
          <span className="h-full mr-4 self-center">
            {session?.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            type="button"
            className="bg-blue-300 rounded p-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
