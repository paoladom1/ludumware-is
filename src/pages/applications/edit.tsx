import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { AdmissionForm } from "@/components/admissionForm";
import { unstable_getServerSession, User } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { trpc } from "@/utils/trpc";
import { Loading } from "@/components/loading";
import { UserRole } from "@prisma/client";

const ApplicationPage: NextPage<{ user: User }> = ({ user }) => {
  const { isLoading, data } = trpc.useQuery([
    "admissionForm.findByUser",
    { id: user.id },
  ]);

  return (
    <>
      <Head>
        <title>Formulario de solicitud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {isLoading && <Loading />}
      {!isLoading && <AdmissionForm isEdit={!!data} />}
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
    props: {
      user: session.user,
    },
  };
};

export default ApplicationPage;
