import React from "react";
import { AdmissionForm } from "@/components/admissionForm";

export const CreateFile: React.FC = () => {
  return (
    <div>
      <div className="px-5 py-4 pb-12 justify-between flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3xl">Bienvenido</h1>
          <h2 className="text-xl">Fecha actual</h2>
        </div>
        <button
          type="button"
          className="bg-blue-300 rounded p-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white"
        >
          Regresar
        </button>
      </div>

      <AdmissionForm />
    </div>
  );
};
