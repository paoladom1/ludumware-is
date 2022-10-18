import { UserRole } from "@prisma/client";
import { NextPage, GetServerSideProps } from "next";
import { NextAuthOptions } from "next-auth";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";
import { AdmissionForm } from "./components/admissionForm";
import { Dashboard } from "./components/dashboard";
import { Loading } from "./components/loading";

const Home: NextPage<{ session: NextAuthOptions }> = () => {
  const { data: hasActiveApplication, isLoading } = trpc.useQuery([
    "admissionForm.hasActiveApplication",
  ]);

  if (isLoading) {
    return <Loading />;
  }

  if (hasActiveApplication) {
    return <Dashboard />;
  }

  return <AdmissionForm />;
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
      session,
    },
  };
};

export default Home;
