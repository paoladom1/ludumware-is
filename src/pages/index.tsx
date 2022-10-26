import React from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";

import { DonutGraph } from "@/components/donutGraph";
import GraficaBarraH from "@/components/barGraphH";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

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

const ScholarsByGender: React.FC = () => (
  <div className="h-auto bg-white rounded p-9 shadow-lg">
    <h1 className="text-lg text-center font-bold pb-3">Becarios por género.</h1>
    <DonutGraph />
  </div>
);

const ApplicationsReceived: React.FC = () => (
  <div className="h-auto bg-white rounded p-9 shadow-lg">
    <h1 className="text-lg text-center font-bold pb-3">
      Solicitudes recibidas.
    </h1>
    <h2 className="p-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta rerum animi
      natus. Saepe exercitationem nisi nulla! Dolor voluptatum, tenetur quasi
      magnam cupiditate, repellat quo sed fuga, sunt laborum explicabo mollitia?
    </h2>
  </div>
);

const ScholarsByInstitution: React.FC = () => (
  <div className="col-span-2 row-span-2 h-full bg-white rounded p-9 shadow-lg">
    <h1 className="text-lg text-center font-bold">
      Becarios por institución de estudio.
    </h1>
    <GraficaBarraH />
  </div>
);
