import React from "react";

import Layout from "@/components/layout";
// import GraficaBarra from "@/components/GraficaBarra";
import GraficaDona from "@/components/GraficaDona";
import GraficaBarraH from "@/components/GraficaBarraH";

export const Dashboard: React.FC = () => {
  return (
    //Se muestra todo lo que tiene Layout (menu lateral)
    <Layout>
      <div className="px-2 py-2 pb-4">
        <h1 className="text-3xl">Bienvenido</h1>
        <h2 className="text-xl">Fecha actual</h2>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta rerum
            animi natus. Saepe exercitationem nisi nulla! Dolor voluptatum,
            tenetur quasi magnam cupiditate, repellat quo sed fuga, sunt laborum
            explicabo mollitia?
          </h2>
        </div>
      </div>
    </Layout>
  );
};

