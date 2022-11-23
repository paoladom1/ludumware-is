import { NextPage, GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { UserRole } from "@prisma/client";
import { PrintPage } from "@/components/records/printPage";

import { authOptions } from "../api/auth/[...nextauth]";

import { createGlobalStyle } from "styled-components";

const ApplicationDetailsExp: NextPage = () => {
  const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;
  return (
    <div>
      <GlobalStyles />
      <PrintPage />
    </div>
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

export default ApplicationDetailsExp;
