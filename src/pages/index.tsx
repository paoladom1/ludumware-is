import { NextPage, GetServerSideProps } from "next";
import { NextAuthOptions } from "next-auth";
import { unstable_getServerSession } from "next-auth/next";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";
import AdmisionForm from "./components/admissionForm";

const Home: NextPage<{ session: NextAuthOptions }> = () => {
  const { data: hasActiveApplication, isLoading } = trpc.useQuery([
    "admissionForm.hasActiveApplication",
  ]);

  if (isLoading) {
    return <h2>Cargando...</h2>;
  }

  if (hasActiveApplication) {
    return <h2>Dashboard</h2>;
  }

  return <AdmisionForm />;
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
