import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faGoogle,
    faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const Login: NextPage = () => {
    const { data: session, status } = useSession();

    return (
        <div className="h-vh w-full bg-gray-200 flex justify-center items-center">
            {session ? (
                <div>
                    <p>hi {session.user?.name}</p>

                    <button onClick={() => signOut()}>Logout</button>
                </div>
            ) : (
                <div className="bg-white flex flex-col justify-center items-center p-8 m-8">
                    <p className="text-blue-400 font-bold text-4xl">LUDUMWARE</p>
                    <p className="text-gray-500 text-2xl font-normal my-7">
                        Inicia sesión
                    </p>
                    <button className="w-80 bg-facebook text-white text-l py-2 px-5 mb-3">
                        <FontAwesomeIcon className="text-xl mr-2" icon={faFacebook} />
                        Inicia sesión con Facebook
                    </button>
                    <button className="w-80 bg-google text-white text-l py-2 px-5 mb-3">
                        <FontAwesomeIcon className="text-xl mr-2" icon={faGoogle} />
                        Inicia sesión con Google
                    </button>
                    <button
                        className="w-80 bg-discord text-white text-l py-2 px-5"
                        onClick={() => signIn("discord")}
                    >
                        <FontAwesomeIcon className="text-xl mr-2" icon={faDiscord} />
                        Inicia sesión con Discord
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
