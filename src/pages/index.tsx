import React from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";

import GraficaDona from "@/components/donutGraph";
import GraficaBarraH from "@/components/barGraphH";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { format } from "date-fns";
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
        <div className="px-2 py-2 pb-4">
          <h1 className="text-3xl">Bienvenido {session?.user?.name}</h1>
          <h2 className="text-xl">{format(new Date(), "dd/mm/yyyy")}</h2>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-4 p-2">
          <div className="col-span-2 row-span-2 h-full bg-white rounded p-9 shadow-lg">
            <h1 className="text-lg text-center font-bold">
              Becarios por institución de estudio.
            </h1>
            <GraficaBarraH />
          </div>

          <div className="h-auto bg-white rounded p-9 shadow-lg">
            <h1 className="text-lg text-center font-bold pb-3">
              Becarios por género.
            </h1>
            <GraficaDona />
          </div>

          <div className="h-auto bg-white rounded p-9 shadow-lg">
            <h1 className="text-lg text-center font-bold pb-3">
              Solicitudes recibidas.
            </h1>
            <h2 className="p-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              rerum animi natus. Saepe exercitationem nisi nulla! Dolor
              voluptatum, tenetur quasi magnam cupiditate, repellat quo sed
              fuga, sunt laborum explicabo mollitia?
            </h2>
          </div>
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

  // if (session.user?.role === UserRole.ADMIN) {
  //   return {
  //     redirect: {
  //       destination: "/applications",
  //       permanent: true,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};

export default Home;
