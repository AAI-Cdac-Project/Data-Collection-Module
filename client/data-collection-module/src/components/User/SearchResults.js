import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../../services/api";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get(`/sentences/search?keyword=${keyword}`);
        // console.log(response.);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch data");
        // }
        // const data = await response.json();
        setResults(response.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) fetchResults();
  }, [keyword]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{keyword}"</h2>
      
      {/* Link to go back to search page */}
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Search
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul className="list-disc pl-6">
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
          {results?.map((sentence) => (
                <tr
                  key={sentence?.globalId}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sentence?.globalId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sentence?.sentenceText}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sentence?.translationText || "N/A"}
                  </td>                  
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
