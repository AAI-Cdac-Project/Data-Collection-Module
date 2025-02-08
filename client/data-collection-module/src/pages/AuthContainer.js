import React from "react";
import AnuvaadLogo from "../Icons/AnuvadKoshLogo.svg";
import { Outlet } from "react-router-dom";

const AuthContainer = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="flex items-center justify-center bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-4xl">
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-6 bg-gradient-to-r from-indigo-400 to-indigo-500 text-white rounded-l-2xl">
          <img
            src={AnuvaadLogo}
            alt="Anuvaad Logo"
            className="w-24 h-24 mb-3 animate-bounce"
          />
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-3/4 rounded-lg "
            alt="Illustration"
          />
          <h2 className="text-2xl font-extrabold mt-6 text-center">
            Welcome to AnuvaadKosh!
          </h2>
        </div>
        <div className="flex-1">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;