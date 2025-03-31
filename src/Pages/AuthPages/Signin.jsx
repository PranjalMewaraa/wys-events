import React from "react";
import Layout from "../Onboarding/Layout";
import { SignIn } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/clerk-react";
const Signin = () => {
  return (
    <Layout>
      <div className="flex  flex-col h-full flex-1 w-full justify-center gap-8 items-center">
        <p className=" poppins-semibold-italic text-2xl text-center w-full">
          Place worth <span className="text-orange-400">Going</span>,
          <br />
          place worth <span className="text-orange-400">Knowing</span>
        </p>
        <GoogleButtonOnly />
      </div>
    </Layout>
  );
};

export default Signin;

const GoogleButtonOnly = () => {
  const { signIn } = useSignIn();

  const handleGoogleSignIn = async () => {
    await signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
    >
      <img src="/google.webp" alt="Google" className="w-5 h-5" />
      <span className="text-base text-gray-700 font-medium">
        Sign in with Google
      </span>
    </button>
  );
};
