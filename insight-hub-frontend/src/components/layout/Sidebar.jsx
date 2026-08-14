import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.roles?.includes("ADMIN");

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Posts", path: "/posts" },
    { name: "Create Post", path: "/posts/create" },
    { name: "Notifications", path: "/notifications" },
    { name: "Profile", path: "/profile" },
  ];
  const handleLogout = () => {
  logout();
  setSidebarOpen(false);
  navigate("/login");
};

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-blue-600">
            InsightHub
          </h1>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/admin/moderation"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Moderation
            </NavLink>
          )}
        </nav>
        <div className="border-t border-gray-200 p-4 sm:hidden">
        <button
         type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
         <LogOut size={18} />
           Logout
          </button>
         </div>
      </aside>
    </>
  );
}