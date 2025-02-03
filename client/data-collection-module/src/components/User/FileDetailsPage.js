import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const FileDetailsPage = () => {
  const { documentId } = useParams(); // Fetch documentId from the URL
  const [sentences, setSentences] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the sentences for the specific document
    setIsLoading(true); // Set loading state to true when fetching data
    api
      .get(`/sentences/document/${documentId}`) // Replace with your actual endpoint
      .then((response) => {
        setSentences(response.data);
        setIsLoading(false); // Set loading state to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching sentences:", error);
        setIsLoading(false); // Handle error and stop loading
      });
  }, [documentId]);

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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Sentences for Document {documentId}
      </h1>
      {isLoading ? (
        // Shimmer UI for loading state
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : sentences.length === 0 ? (
        // Display when no sentences are found
        <p className="text-center text-xl text-gray-600 py-8">File is empty.</p>
      ) : (
        // Table to display sentences
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Sentence (Source Language)
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Translation
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sentences.map((sentence) => (
                <tr
                  key={sentence?.sentenceId}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sentence?.sentenceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sentence?.originalSentence}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sentence?.translation || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                        sentence?.status
                      )}`}
                    >
                      {sentence?.status}
                    </span>
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

export default FileDetailsPage;
