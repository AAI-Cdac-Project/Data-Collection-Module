import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialKeyword = queryParams.get("keyword") || "";
  
  const [keyword, setKeyword] = useState(initialKeyword);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const response = await api.get(`/sentences/search?keyword=${keyword}`);
      setResults(response.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialKeyword) fetchResults();
  }, [initialKeyword]);

  const handleSearch = () => {
    navigate(`?keyword=${keyword}`);
    fetchResults();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dictionary Search</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search dictionary here..."
          className="border border-gray-300 p-2 rounded-l-md w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Home
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((sentence) => (
              <tr key={sentence.globalId} className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sentence.globalId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sentence.sentenceText}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sentence.translationText || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
