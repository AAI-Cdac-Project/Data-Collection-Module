import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    const user = {
      password,
      fullName,
      email,
    };

    try {
      await axios.post("http://localhost:8080/api/user/register", user);
      setSuccess("A verification email has been sent to your email. Please verify to continue.");
      setError("");
      setTimeout(() => {
        navigate("/auth");
      }, 1000);
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>
      
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account? {" "}
          <button
            onClick={() => navigate("/auth")}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Registration;