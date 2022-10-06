import { NextPage } from "next";
import { useSession } from "next-auth/react";
import AdmisionForm from "./components/admissionForm";

const Home: NextPage = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="m-4">
      <AdmisionForm />
    </div>
  );
};

export default Home;
