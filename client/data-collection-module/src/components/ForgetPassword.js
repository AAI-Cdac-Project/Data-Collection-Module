import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
        if (email==="") {
            setError("Enter Your Email");
            setSuccess("");
            return;
        }
      await axios.post("http://localhost:8080/api/auth/send-otp", { email });
      setOtpSent(true);
      setError("");
      setSuccess("OTP sent to your email.");
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP. Please try again.");
      setSuccess("");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", { email, otp, newPassword });
      setSuccess("Password reset successfully. You can now log in.");
      setError("");
      setTimeout(() => {
        navigate("/auth");
      }, 1000);
    } catch (err) {
      console.log(err);
      setError("Failed to reset password. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Forgot Password</h2>
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      {!otpSent ? (
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
            placeholder="Enter your email"
            required
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
              placeholder="Enter OTP"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none"
              placeholder="Enter new password"
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
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
        
      )}
      <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New user?{" "}
            <button
              onClick={() => navigate("/auth")}
              className="text-blue-500 hover:text-blue-600"
            >
              signin
            </button>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => navigate("/auth/signup")}
              className="text-blue-500 hover:text-blue-600"
            >
              Register
            </button>
          </p>
        </div>
    </div>
  );
};

export default ForgotPassword;