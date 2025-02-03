import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = useSelector(state=>state.auth.userId);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(userId);
        const response = await api.get(`/user/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            <span className="text-gray-900">Full Name:</span> {user?.fullName}
          </h2>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            <span className="text-gray-900">Username:</span> {user?.username}
          </h2>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            <span className="text-gray-900">Role:</span> {user?.role}
          </h2>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            <span className="text-gray-900">Active Status:</span>{" "}
            {user?.isActive ? "Active" : "Inactive"}
          </h2>
        </div>
        {user?.refreshToken && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              <span className="text-gray-900">Refresh Token:</span>{" "}
              {user?.refreshToken}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
