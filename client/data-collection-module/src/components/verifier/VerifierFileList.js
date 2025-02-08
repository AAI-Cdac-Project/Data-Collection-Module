import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux"; // Importing useSelector to get data from Redux
import api from "../../services/api";

const VerifierFileList = ({ status }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch verifier info from Redux store
  const verifierInfo = useSelector(state => state.auth); // Assuming auth slice stores user details like fullName, email, and role
  const { userId, fullName, email, role } = verifierInfo;

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error on each new fetch

    if (!userId) {
      setLoading(false);
      return;
    }

    api
      .get(`/verifier/${userId}`) // Endpoint adjusted for verifier
      .then((response) => {
        setFiles(response.data);
         // Set files state with the response data
      })
      .catch((error) => {
        setError("Error fetching documents: " + error.message); // Set error message
      })
      .finally(() => setLoading(false)); // Set loading to false when API call finishes
  }, [userId, status]); // Effect depends on userId and status

  // Filter files based on status and verifier ID
  // const filteredFiles = files.filter(file => file.status === status && file.verifierId === userId);
    // console.log("files is here",filteredFiles)
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg w-80 h-full shadow-lg border border-gray-200">
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-gray-600 text-5xl" />
      </div>

      {/* Display verifier info */}
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold">{fullName}</h2>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-4">Loading files...</p>
      ) : error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : files.length > 0 ? (
        <ul className="space-y-3 w-full">
          {files.map((file) => (
            <li key={file.documentId} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition">
              <div className="flex items-center">
                <FaFileAlt className="text-blue-500 text-lg mr-3" />
                <Link
                  to={`/verifier/fileDetails/${file.documentId}`}
                  className="text-gray-800 font-medium hover:text-blue-600 transition"
                >
                  {file.fileName}
                </Link>
              </div>
              <Link to={`/verifier/fileDetails/${file.documentId}`} className="text-blue-500 hover:text-blue-700 transition">
                <FaExternalLinkAlt className="text-lg" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-4">No {status} files found.</p>
      )}
    </div>
  );
};

export default VerifierFileList;
