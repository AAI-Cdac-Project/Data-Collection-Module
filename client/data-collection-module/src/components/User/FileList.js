import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FileList = () => {
  const files=useSelector(state=>state.document.documents);
  const userInfo=useSelector(state=>state.auth);
  return (
    <div className="flex flex-col p-4 bg-gray-100 shadow-md rounded-lg w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Welcome {userInfo?.fullName}</h1>
      {files.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {files.map((file) => (
            <li key={file.documentId} className="text-gray-700">
              <Link
                to={`/fileDetails/${file.documentId}`}
                className="text-blue-500 hover:underline hover:text-blue-600 transition"
              >
                {file.fileName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files found.</p>
      )}
    </div>
  );
};

export default FileList;
