import React, { useState } from "react";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { FaUserEdit, FaSave, FaTimes, FaUser } from "react-icons/fa";

const UserDetails = () => {
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const userInfo = useSelector(state => state.auth);
  const { userId, email, role } = userInfo;
  const [fullName, setFullName] = useState(userInfo.fullName);

  const handleEdit = async () => {
    try {
      const response = await api.put(`/user/updateUserFullname/${userId}`, { fullName });
      setFullName(response.data.fullName);
      setEditing(false);
    } catch (err) {
      setError("Failed to update details. Please try again later.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <FaUser className="text-gray-700 text-6xl mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <span className="text-gray-900 mr-2">Full Name:</span>
            {editing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-gray-700 focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <span>{fullName}</span>
            )}
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="ml-2 text-blue-500 hover:text-blue-700 transition"
              >
                <FaUserEdit />
              </button>
            )}
          </h2>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            <span className="text-gray-900">Email:</span> {email}
          </h2>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            <span className="text-gray-900">Role:</span> {role}
          </h2>
        </div>

        {editing && (
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600 transition"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg flex items-center hover:bg-gray-500 transition"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
