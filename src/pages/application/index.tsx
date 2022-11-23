import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { AdmissionForm } from "@/components/admissionForm";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { UserRole } from "@prisma/client";

const ApplicationPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Formulario de solicitud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AdmissionForm isEdit={false} />
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

  if (session.user?.role === UserRole.ADMIN) {
    return {
      redirect: {
        destination: "/applications",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default ApplicationPage;
