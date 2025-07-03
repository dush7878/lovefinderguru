import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { MessageSquare } from "lucide-react";

const UserHome = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users/all");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 font-barlow">
      <h2 className="text-2xl font-semibold mb-6">🌐 People on the Platform</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-dark-blue border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <img
                  src={u.profileImage || "/default-avatar.png"}
                  alt={u.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white"
                />
                <div className="space-y-1 text-sm">
                  <p className="text-white font-semibold">{u.name}</p>
                  <p className="text-gray-400">Age: {u.age}</p>
                  <p className="text-gray-400">Status: {u.status || "Active"}</p>
                </div>
              </div>

              {/* Chat Button */}
              <button
                onClick={() => navigate(`/chats/${u._id}`)}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm transition-all"
              >
                <MessageSquare size={16} /> Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;

