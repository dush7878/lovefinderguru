import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, PlusCircle, MessageSquare, Users } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center tracking-wide">Admin Panel</h1>

        <nav className="flex flex-col gap-3 text-sm">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-money"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            <PlusCircle size={18} />
            Add Money
          </NavLink>

          <NavLink
            to="/admin/chats"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            <MessageSquare size={18} />
            View Chats
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            <Users size={18} />
            User List
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
