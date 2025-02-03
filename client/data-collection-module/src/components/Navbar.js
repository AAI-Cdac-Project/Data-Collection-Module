import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import LogoutIcon from "../Icons/LogoutIcon.png";
import LoginIcon from "../Icons/login.png";
import RegisterIcon from "../Icons/userRegistration.png";

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* App Logo / Title */}
        <div className="text-2xl font-semibold tracking-wide">
          <Link
            to={
              role === "ADMIN"
                ? "/admin/dashboard"
                : role === "VERIFIER"
                ? "/verifier/dashboard"
                : "/"
            }
            className="text-blue-400 hover:text-blue-500 transition duration-300"
          >
            Data-Collection-Module
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-300 hover:bg-red-400 text-white rounded-lg transition duration-300 transform hover:scale-105"
            >
              <img className="h-5 w-5 mr-2" src={LogoutIcon} alt="Logout" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 transform hover:scale-105"
              >
                <img className="h-5 w-5 mr-2" src={LoginIcon} alt="Login" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 transform hover:scale-105"
              >
                <img className="h-5 w-5 mr-2" src={RegisterIcon} alt="Register" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
