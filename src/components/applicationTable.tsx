import React from "react";

import { Application, ApplicationStatus } from "@prisma/client";

import { STATUS_MAPPER } from "@/utils/applications";
import Link from "next/link";
import { User } from "next-auth";
import { trpc } from "@/utils/trpc";
import { Loading } from "./loading";

interface ApplicationRowProps {
  application: Application | undefined;
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({ application }) => {
  if (!application) return <span>No hay información</span>;

  const { status, firstName, email, createdAt, declineReason, pendingReason } =
    application;

  const statusData: { label: string; color: string } =
    STATUS_MAPPER[status as keyof typeof ApplicationStatus];

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6">
        <span className={`${statusData.color}`}>{statusData.label}</span>
      </td>
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {email}
      </th>
      <td className="py-4 px-6">{firstName}</td>
      <td className="py-4 px-6">{createdAt?.toLocaleDateString("es-ES")}</td>
      <td className="py-4 px-6">{pendingReason}</td>
      <td className="py-4 px-6">{declineReason}</td>

      <td className="py-4 px-6 text-right">
        {application?.status === ApplicationStatus.PENDING ? (
          <Link href={`/application/edit`}>
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Editar
            </a>
          </Link>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};

export const StudentApplication: React.FC<{ user: User }> = ({ user }) => {
  const { isLoading, data } = trpc.useQuery([
    "admissionForm.findByUser",
    { id: user.id },
  ]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col">
      {!data && (
        <Link href={`application/`}>
          <a className="flex my-6 mr-2 self-end font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Crear Solicitud
          </a>
        </Link>
      )}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Estado
              </th>
              <th scope="col" className="py-3 px-6">
                Correo Electronico
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  Nombre del aspirante
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 w-3 h-3"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  Fecha de Aplicación
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 w-3 h-3"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  Modificar campos
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 w-3 h-3"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  Razón de rechazo
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 w-3 h-3"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            <ApplicationRow application={data} />
          </tbody>
        </table>
      </div>
    </div>
  );
};
