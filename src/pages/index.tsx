import { NextPage } from "next";
import Login from "./login";
import AdmisionForm from "./components/admisionForm";


const Home: NextPage = () => {
  return (
    <div className="m-4">
      <AdmisionForm />
    </div>
  )
};

export default Home;