/* eslint-disable @next/next/no-img-element */
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
    <div className="w-full flex justify-center items-center">
      <section className="h-screen">
        <div className="px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-5/12 mb-12 md:mb-0 mb-10">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:w-6/12 lg:ml-20">
              <div className="bg-white rounded-lg flex flex-col justify-center items-center p-8 m-8">
                <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
                  Ludumware
                </span>
                <p className="text-gray-500 text-2xl self-center whitespace-nowrap font-normal my-7">
                  Inicia sesión
                </p>
                <button
                  className="w-80 bg-facebook text-white text-l py-2 px-5 mb-3 flex flex-row justify-evenly"
                  onClick={() => signIn("facebook", { callbackUrl: "/" })}
                >
                  <FontAwesomeIcon
                    className="text-xl pl-1.5"
                    icon={faFacebook}
                  />
                  <span>Inicia sesión con Facebook</span>
                </button>
                <button
                  className="w-80 bg-google text-white text-l py-2 px-5 mb-3 flex flex-row justify-evenly"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <FontAwesomeIcon className="text-xl" icon={faGoogle} />
                  <span>Inicia sesión con Google</span>
                </button>
                <button
                  className="w-80 bg-discord text-white text-l py-2 px-5 mb-3 flex flex-row justify-evenly"
                  onClick={() => signIn("discord", { callbackUrl: "/" })}
                >
                  <FontAwesomeIcon className="text-xl" icon={faDiscord} />
                  <span>Inicia sesión con Discord</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
