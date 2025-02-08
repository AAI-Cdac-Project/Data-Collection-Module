import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { FaEdit, FaSave, FaCheckCircle } from "react-icons/fa"; // Edit, Save, and Commit icons

const VerifierDetailsPage = () => {
  const { documentId } = useParams(); // Fetch documentId from the URL
  const [sentences, setSentences] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [editingSentenceId, setEditingSentenceId] = useState(null); // Track which sentence is being edited
  const [updatedTranslation, setUpdatedTranslation] = useState(""); // For storing updated translation

  useEffect(() => {
    // Fetch the sentences for the specific document
    setIsLoading(true);
    api
      .get(`/sentences/document/${documentId}`)
      .then((response) => {
        setSentences(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sentences:", error);
        setIsLoading(false);
      });
  }, [documentId]);

  const handleEdit = (sentenceId, currentTranslation) => {
    setEditingSentenceId(sentenceId); // Set the sentence being edited
    setUpdatedTranslation(currentTranslation); // Pre-fill the input with the current translation
  };

  const handleSave = (sentenceId) => {
    // Save the updated translation via API
    api
      .put(`/sentences/${sentenceId}`, { translation: updatedTranslation })
      .then(() => {
        setSentences((prevSentences) =>
          prevSentences.map((sentence) =>
            sentence.sentenceId === sentenceId
              ? { ...sentence, translation: updatedTranslation }
              : sentence
          )
        );
        setEditingSentenceId(null); // Exit editing mode
      })
      .catch((error) => {
        console.error("Error saving translation:", error);
      });
  };

  const handleCommit = (sentenceId) => {
    // Commit the translation change via API
    api
      .put(`/global/sentences/${sentenceId}/commit`)
      .then(() => {
        // Update the sentence status to 'verified' after commit
        setSentences((prevSentences) =>
          prevSentences.map((sentence) =>
            sentence.sentenceId === sentenceId
              ? { ...sentence, status: "verified" }
              : sentence
          )
        );
        alert("Translation committed and verified!");
        setEditingSentenceId(null); // Exit editing mode
      })
      .catch((error) => {
        console.error("Error committing translation:", error);
      });
  };

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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Action
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
                    {editingSentenceId === sentence.sentenceId ? (
                      <input
                        type="text"
                        value={updatedTranslation}
                        onChange={(e) => setUpdatedTranslation(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      sentence?.translation || "N/A"
                    )}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingSentenceId === sentence.sentenceId ? (
                      <>
                        <button
                          onClick={() => handleSave(sentence.sentenceId)}
                          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                        >
                          <FaSave /> Save
                        </button>
                      </>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleCommit(sentence.sentenceId)}
                          className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
                        >
                          <FaCheckCircle className="mr-2" /> Commit
                        </button>
                        <button
                          onClick={() => handleEdit(sentence.sentenceId, sentence.translation)}
                          className="text-blue-500 flex items-center "
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                      </div>
                    )}
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

export default VerifierDetailsPage;
