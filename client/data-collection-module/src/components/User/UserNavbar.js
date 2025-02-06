import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${searchQuery}`);
      setSearchQuery(""); // Clear input after search
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 border-b border-gray-200 flex justify-between items-center">
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

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md p-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
          🔍
        </button>
      </form>
    </nav>
  );
};

export default UserNavbar;