import { NextPage } from "next";
import AdmisionForm from "./components/admissionForm";

const Home: NextPage = () => {
  return (
    <div className="m-4">
      <AdmisionForm />
    </div>
  );
};

export default Home;
