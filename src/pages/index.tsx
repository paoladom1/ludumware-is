import { NextPage } from "next";
import Login from "./login";
import AdmisionForm from "./components/admisionForm";


const Home: NextPage = () => {
  return (
    <div>
      <AdmisionForm />
    </div>
  )
};

export default Home;