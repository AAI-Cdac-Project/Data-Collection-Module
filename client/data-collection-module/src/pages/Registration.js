import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registeration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // New state for success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      password,
      fullName,
      email,
    };

    try {
      await axios.post("http://localhost:8080/api/user/register", user);
      setSuccess("A verification email has been sent to your email. Please verify to continue.");
      setError(""); // Clear any previous errors
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
      
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
      setSuccess(""); // Clear success message if registration fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">SignUp</h2>
        
        {/* Success Message */}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        
        {/* Error Message */}
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registeration;
