import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import { MessageSquareText, UserCircle2 } from "lucide-react";

const ChatList = () => {
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await API.get("/chat/list");
        setChatUsers(res.data); // Expecting [{ user, lastMessage, isUnread }]
      } catch (err) {
        console.error("Chat list error:", err);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 font-barlow">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquareText className="text-blue-500" />
        <h2 className="text-2xl font-semibold">Recent Chats</h2>
      </div>

      {chatUsers.length === 0 ? (
        <p className="text-gray-500">No chats yet.</p>
      ) : (
        <div className="space-y-4">
          {chatUsers.map(({ user, lastMessage, isUnread }) => (
            <Link
              to={`/chats/${user._id}`}
              key={user._id}
              className="block bg-dark-blue border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-blue-600/50 transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center gap-4">
                {/* Profile Picture or Icon */}
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl border-2 border-white">
                    <UserCircle2 />
                  </div>
                )}

                {/* Name + Last Message */}
                <div className="flex-1 overflow-hidden">
                  <p className="text-lg font-semibold truncate">{user.name}</p>
                  <p
                    className={`text-sm truncate ${
                      isUnread ? "text-white font-semibold" : "text-gray-400"
                    }`}
                  >
                    {lastMessage || "Start chatting..."}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
