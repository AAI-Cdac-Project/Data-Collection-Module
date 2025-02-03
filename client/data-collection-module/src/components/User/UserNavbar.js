import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 border-b border-gray-200">
      <ul className="flex gap-6">
        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
          >
            All Documents
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            className="text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
          >
            Upload New Document
          </Link>
        </li>
        <li>
          <Link
            to="/userdetails"
            className="text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
          >
            User Details
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;