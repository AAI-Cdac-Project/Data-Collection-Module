import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../services/api';
import { Link } from 'react-router-dom';

const UserSideBar = () => {
    const [documents, setDocuments] = useState(null); // Start with null to distinguish between loading and empty states
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const userId = useSelector(state=>state.auth.userId);
    useEffect(() => {
        setIsLoading(true); // Show spinner during fetch
        api.get(`/documents/user/${userId}`)
            .then(response => {
                setDocuments(response.data || []); // Ensure documents is always an array
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
                setDocuments([]); // Default to an empty array on error
            })
            .finally(() => setIsLoading(false)); // Hide spinner after fetch
    }, []);
    return (
        <div className="flex-col  ml-1">
            <h1 className="text-xl font-semibold mb-4">Document List</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : documents.length === 0 ? (
                <p className="text-center text-xl text-gray-600">No Files are Present</p>
            ) : (
                <table className="min-w-full table-auto">
                    <tbody>
                        {documents.map((document) => (
                                <td className="px-4 py-2">
                                    <Link to={`/user/fileDetails/${document.documentId}`} className="text-blue-500">
                                        {document.fileName}
                                    </Link>
                                </td>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserSideBar