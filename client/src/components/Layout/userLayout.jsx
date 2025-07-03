import { NavLink, Outlet } from "react-router-dom";
import { Home, Search, MessageCircle, User } from "lucide-react";
import Navbar from "./Navbar";

const tabs = [
  { label: "Home", path: "/home", icon: <Home size={20} /> },
  { label: "Search", path: "/search", icon: <Search size={20} /> },
  { label: "Chats", path: "/chats", icon: <MessageCircle size={20} /> },
  { label: "Profile", path: "/profile", icon: <User size={20} /> },
];

const UserLayout = () => {
  const navbarHeight = 56; // You can adjust based on Navbar height
  const bottomNavHeight = 64; // Adjust based on mobile nav height

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-barlow relative">
      {/* Fixed Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900">
        <Navbar />
      </div>

      {/* Main Scrollable Content */}
      <main
        className="flex-1 overflow-y-auto pt-[56px] pb-[64px]"
        style={{
          minHeight: `calc(100vh - ${navbarHeight + bottomNavHeight}px)`,
        }}
      >
        <Outlet />
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-900 border-t border-zinc-700 flex justify-around items-center py-3 shadow-inner">
        {tabs.map((tab) => (
          <NavLink
            to={tab.path}
            key={tab.label}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs transition-all ${
                isActive
                  ? "text-blue-500 font-semibold"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {tab.icon}
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default UserLayout;
