import React, { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`transition-transform duration-500 ease-in-out ${
          isLogin ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isLogin ? <Login toggleForm={toggleForm} /> : <Registration toggleForm={toggleForm} />}
      </div>
    </div>
  );
};

export default AuthContainer;