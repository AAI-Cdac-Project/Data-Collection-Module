import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const VerifierSideBar = () => {
  const { status } = useParams(); // Get the status (pending or verified) from the URL
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const verifierId = 4; // Static verifierId for now

  // Status color mapping function
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

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/verifier/${verifierId}`) // Fetch files for the specific verifier
      .then((response) => {
        console.log("Status from URL:", status); // Log the status value
        console.log("Files fetched:", response.data); // Log response data for debugging

        // Filter the files based on the status
        const filteredFiles = response.data.filter((file) => {
          return file.status && file.status.toUpperCase() === status.toUpperCase();
        });

        console.log("Filtered files:", filteredFiles); // Log the filtered files
        setFiles(filteredFiles);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
        setFiles([]);
      })
      .finally(() => setIsLoading(false));
  }, [status, verifierId]); // Re-fetch data when the status or verifierId changes

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Documents for Verifier</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : files.length === 0 ? (
        <p className="text-center text-xl text-gray-700 py-8">
          No documents with status "{status}" found.
        </p>
      ) : (
        <div className="shadow-md rounded-lg w-full">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Document ID
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
                  User ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((document) => (
                <tr
                  key={document.documentId}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link
                      to={`/verifier/fileDetails/${document.documentId}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {document.documentId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link
                      to={`/verifier/fileDetails/${document.documentId}`}
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
                    {document.userId || "N/A"}
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

export default VerifierSideBar;
