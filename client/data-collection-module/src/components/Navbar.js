import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBook } from "react-icons/fa";
import DictionaryModal from "./DictionaryModal"; 
import AnuvaadLogo from "../Icons/AnuvaadKoshLogo.svg";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDictionaryOpen, setDictionaryOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={AnuvaadLogo} alt="Anuvaad Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold tracking-wide">AnuvaadKosh</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {/* Dictionary Button */}
          <button
            onClick={() => setDictionaryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-300 transform hover:scale-105"
          >
            <FaBook className="text-lg" /> Dictionary
          </button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300 transform hover:scale-105"
            >
              <FaSignOutAlt className="text-lg" /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 transform hover:scale-105"
              >
                <FaSignInAlt className="text-lg" /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 transform hover:scale-105"
              >
                <FaUserPlus className="text-lg" /> Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Dictionary Modal */}
      {isDictionaryOpen && <DictionaryModal onClose={() => setDictionaryOpen(false)} />}
    </nav>
  );
};

export default Navbar;
