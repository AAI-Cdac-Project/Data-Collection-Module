import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle, FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";

const FileList = () => {
  const files = useSelector(state => state.document.documents);
  const userInfo = useSelector(state => state.auth);

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg w-80 h-full shadow-lg border border-gray-200">
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-gray-600 text-5xl" />
        <h1 className="text-xl font-semibold mt-2 text-gray-800">Welcome, {userInfo?.fullName}</h1>
      </div>

      {files.length > 0 ? (
        <ul className="space-y-3 w-full">
          {files.map((file) => (
            <li key={file.documentId} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition">
              <div className="flex items-center">
                <FaFileAlt className="text-blue-500 text-lg mr-3" />
                <Link
                  to={`/fileDetails/${file.documentId}`}
                  className="text-gray-800 font-medium hover:text-blue-600 transition"
                >
                  {file.fileName}
                </Link>
              </div>
              <Link to={`/fileDetails/${file.documentId}`} className="text-blue-500 hover:text-blue-700 transition">
                <FaExternalLinkAlt className="text-lg" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-4">No files found.</p>
      )}
    </div>
  );
};

export default FileList;
