import { NextPage, GetServerSideProps } from "next";
import { NextAuthOptions } from "next-auth";
import { unstable_getServerSession } from "next-auth/next";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";
import { AdmissionForm } from "./components/admissionForm";
import { Dashboard } from "./components/dashboard";

const Home: NextPage<{ session: NextAuthOptions }> = () => {
  const { data: hasActiveApplication, isLoading } = trpc.useQuery([
    "admissionForm.hasActiveApplication",
  ]);

  if (isLoading) {
    return <h2>Cargando...</h2>;
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

  return {
    props: {
      session,
    },
  };
};

export default Home;
