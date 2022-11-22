import { trpc } from "@/utils/trpc";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/loading";

export const ApplicationsCount: React.FC = () => {
    const { data: session } = useSession({ required: true });
  
    const { isLoading, data } = trpc.useQuery(["dashboard.applicationsCount"]);
  
    if (session?.user?.role !== UserRole.ADMIN) return null;
  
    if (isLoading) return <Loading />;
  
    return (
      <div className="h-auto bg-white rounded p-9 shadow-lg">
        <h1 className="text-lg text-center font-bold pb-3">
          Solicitudes recibidas.
        </h1>
        <h2 className="p-8 text-6xl text-center font-bold">
          {data?.totalApplications}
        </h2>
        <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <h1 className="text-lg text-center font-bold pb-3">
          Solicitudes aceptadas.
        </h1>
        <h2 className="p-8 text-green-700 text-6xl text-center font-bold">
          {data?.acceptedApplications}
        </h2>
      </div>
    );
  };