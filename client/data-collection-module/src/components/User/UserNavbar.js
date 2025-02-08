import React from "react";
import { Link } from "react-router-dom";
import {  FaFolderOpen, FaCloudUploadAlt, FaUser } from "react-icons/fa";

const UserNavbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200">
          <FaFolderOpen className="mr-2" /> All Documents
        </Link>
        <Link to="/upload" className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200">
          <FaCloudUploadAlt className="mr-2" /> Upload New Document
        </Link>
        <Link to="/userdetails" className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200">
          <FaUser className="mr-2" /> User Details
        </Link>
      </div>
    </nav>
  );
};

export default UserNavbar;
