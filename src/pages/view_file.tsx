import React from "react";
import ComponentFile from "./components/view_file/component_file";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

class ViewFile extends React.Component {
  render(): React.ReactNode {
    return (
      //Se muestra todo lo que tiene Layout (menu lateral)
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

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
          <ComponentFile />
        </Worker>
      </div>
    );
  }
}

export default ViewFile;
