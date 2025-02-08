import React from "react";
import SearchResults from "./User/SearchResults"; // Import the search component

const DictionaryModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Dictionary</h2>
        <SearchResults />
      </div>
    </div>
  );
};

export default DictionaryModal;
