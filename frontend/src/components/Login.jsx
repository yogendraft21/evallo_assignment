import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import googleIcon from "../assets/google.png";
import { createToken, loginWithGoogle } from "../services";

const Login = () => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { code } = tokenResponse;
      const { tokens } = await createToken(code);

      const response = await loginWithGoogle(tokens.id_token);
      localStorage.setItem("token", response.token);
      
       navigate("/dashboard");
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">
          Sign in to access your account and start managing your tasks.
        </p>
        <button
          onClick={googleLogin}
          className="flex items-center justify-center px-6 py-3 bg-white text-blue-500 font-semibold border border-gray rounded-lg hover:bg-blue-50 transition duration-300 mx-auto"
        >
          <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
