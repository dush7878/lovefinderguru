import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus } from "lucide-react";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await API.get(`/users/search/${query.trim()}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleChat = (userId) => {
    navigate(`/chats/${userId}`);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 0) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 font-barlow">
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-dark-blue border border-gray-700 rounded-xl px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder-gray-500"
          />
        </div>
      </div>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-dark-blue border border-gray-700 p-4 rounded-xl hover:shadow-blue-600/40 hover:border-blue-600 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
              </div>

              <button
                onClick={() => handleChat(user._id)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition"
              >
                <UserPlus size={16} /> Chat
              </button>
            </div>
          ))}
        </div>
      ) : query ? (
        <p className="text-center text-gray-500 mt-10">No users found.</p>
      ) : null}
    </div>
  );
};

export default SearchUser;
