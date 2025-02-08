import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaFileAlt, FaUser } from "react-icons/fa";

const VerifierNavbar = () => {
     const verified = "verified";
     const pending = "pending";
  return (
    <nav className="bg-white shadow-md p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        {/* Link to /verifier/pending */}
        <Link
          to={`/verifier/${pending}`}

          className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
        >
          <FaClock className="mr-2" /> Pending Files
        </Link>
        
        {/* Link to /verifier/verified */}
        <Link
         to={`/verifier/${verified}`}
          className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
        >
          <FaFileAlt className="mr-2" /> Verifier Files
        </Link>
        
        {/* Link to Verifier Details */}
        <Link
          to="verifierdetails"
          className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
        >
          <FaUser className="mr-2" /> Verifier Details
        </Link>
      </div>
    </nav>
  );
};

export default VerifierNavbar;
