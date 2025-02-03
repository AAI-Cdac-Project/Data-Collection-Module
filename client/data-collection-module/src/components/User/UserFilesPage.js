import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useSelector } from "react-redux";

const UserFilesPage = () => {
  const [documents, setDocuments] = useState(null); // Start with null to distinguish between loading and empty states
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const userId = useSelector(state=>state.auth.userId);

  useEffect(() => {
    setIsLoading(true); // Show spinner during fetch
    api
      .get(`/documents/user/${userId}`)
      .then((response) => {
        setDocuments(response.data || []); // Ensure documents is always an array
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setDocuments([]); // Default to an empty array on error
      })
      .finally(() => setIsLoading(false)); // Hide spinner after fetch
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Document List</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : documents.length === 0 ? (
        <p className="text-center text-xl text-gray-700 py-8">
          No files are present.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Uploaded Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Verifier ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((document) => (
                <tr
                  key={document.documentId}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link
                      to={`/fileDetails/${document.documentId}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {document.documentId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link
                      to={`/fileDetails/${document.documentId}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {document.fileName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                        document.status
                      )}`}
                    >
                      {document.status.charAt(0).toUpperCase() +
                        document.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {document.verifierId || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserFilesPage;