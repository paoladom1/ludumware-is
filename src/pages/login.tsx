import { NextPage } from "next";
import { signIn } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const Login: NextPage = () => {
  const login =
    (provider: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      signIn(provider, { callbackUrl: "/" });
    };

  return (
    <div className="h-vh w-full bg-gray-200 flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center items-center p-8 m-8">
        <p className="text-blue-400 font-bold text-4xl">LUDUMWARE</p>
        <p className="text-gray-500 text-2xl font-normal my-7">Inicia sesión</p>
        <button
          className="w-80 bg-facebook text-white text-l py-2 px-5 mb-3 flex flex-row justify-evenly"
          onClick={login("facebook")}
        >
          <FontAwesomeIcon className="text-xl pl-1.5" icon={faFacebook} />
          <span>Inicia sesión con Facebook</span>
        </button>
        <button
          className="w-80 bg-google text-white text-l py-2 px-5 mb-3 flex flex-row justify-evenly"
          onClick={login("google")}
        >
          <FontAwesomeIcon className="text-xl" icon={faGoogle} />
          <span>Inicia sesión con Google</span>
        </button>
        <button
          className="w-80 bg-discord text-white text-l py-2 px-5 flex flex-row justify-evenly"
          onClick={login("discord")}
        >
          <FontAwesomeIcon className="text-xl" icon={faDiscord} />
          <span>Inicia sesión con Discord</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
