import { UserRole } from "@prisma/client";
import { NextPage, GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Link from "next/link";

import { trpc } from "@/utils/trpc";
import { Loading } from "@/components/loading";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";

interface ApplicationRowProps {
  id: string;
  firstName: string;
  lastName: string;
  levelOfStudy: string;
  createdAt: Date;
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({
  id,
  firstName,
  lastName,
  levelOfStudy,
  createdAt,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <td className="py-4 px-6">{firstName}</td>
      <td className="py-4 px-6">{lastName}</td>
      <td className="py-4 px-6">{levelOfStudy}</td>
      <td className="py-4 px-6">{createdAt.toLocaleDateString("es-ES")}</td>
      <td className="py-4 px-6 text-right">
        <Link href={`/applications/${id}`}>
          <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Ver
          </a>
        </Link>
      </td>
    </tr>
  );
};

const Appications: NextPage = () => {
  const {
    data: applications,
    error,
    isLoading,
  } = trpc.useQuery(["admin.getAllApplications"]);

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Aplicaciones</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-col">
        <h2 className="self-center text-xl uppercase font-bold my-8">
          Solicitudes de aspirantes
        </h2>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          {isLoading && <Loading />}
          {applications && (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID de solicitud
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
                      Apellido del aspirante
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
                      Nivel de estudio
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
                    <span className="sr-only">Ver</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications?.map(
                  ({ id, firstName, lastName, levelOfStudy, createdAt }) => (
                    <ApplicationRow
                      key={id}
                      id={id}
                      firstName={firstName}
                      lastName={lastName}
                      levelOfStudy={levelOfStudy}
                      createdAt={createdAt}
                    />
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
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

  if (session.user?.role !== UserRole.ADMIN) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Appications;
