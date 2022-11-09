import React from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";

import { DonutGraph } from "@/components/donutGraph";
import GraficaBarraH from "@/components/barGraphH";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { UserRole } from "@prisma/client";
import { Loading } from "@/components/loading";

const Home: NextPage = () => {
  const { data: session } = useSession({ required: true });

  return (
    <>
      <Head>
        <title>Tablero</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <>
        <h1 className="text-3xl my-4">Bienvenido {session?.user?.name}</h1>

        <div className="grid grid-cols-3 gap-x-4 gap-y-4 p-2">
          <ScholarsByInstitution></ScholarsByInstitution>
          <ScholarsByGender />
          <ApplicationsReceived />
        </div>
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;

const ScholarsByGender: React.FC = () => {
  const { data: session } = useSession({ required: true });

  const { isLoading, data } = trpc.useQuery(["dashboard.scholarsByGender"]);

  if (session?.user?.role !== UserRole.ADMIN) return null;

  if (isLoading) return <Loading />;

  return (
    <div className="h-auto bg-white rounded p-9 shadow-lg">
      <h1 className="text-lg text-center font-bold pb-3">
        Becarios por género.
      </h1>
      <DonutGraph data={data} />
    </div>
  );
};

const ApplicationsReceived: React.FC = () => {
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

const ScholarsByInstitution: React.FC = () => {
  const { data: session } = useSession({ required: true });
  if (session?.user?.role !== UserRole.ADMIN) return null;
  return (
    <div className="col-span-2 row-span-2 h-full bg-white rounded p-9 shadow-lg">
      <h1 className="text-lg text-center font-bold">
        Becarios por institución de estudio.
      </h1>
      <GraficaBarraH />
    </div>
  );
};
