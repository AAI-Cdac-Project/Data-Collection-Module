import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email: email, password: password }
      );
      const { token, role, userId, fullName, message } = response.data;
      if (token && role && userId) {
        // Save credentials in Redux
        dispatch(setCredentials({ email, token, role, userId, fullName }));
        // Redirect based on role
        if (role === "ADMIN") navigate("/admin/dashboard");
        else if (role === "VERIFIER") navigate("/verifier/dashboard");
        else navigate("/");
      }
      setError(message);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
    {/* <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors"> */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg  max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New user?{" "}
            <button
              onClick={() => navigate("/auth/signup")}
              className="text-blue-500 hover:text-blue-600"
            >
              Register as User
            </button>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => navigate("/auth/forgetpassword")}
              className="text-blue-500 hover:text-blue-600"
            >
              Forget Password
            </button>
          </p>
        </div>
      </div>
    {/* </div> */}
    </>
  );
};

export default Login;
