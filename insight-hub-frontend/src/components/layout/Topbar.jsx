import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const { logout, notifications } = useAuth();

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            Welcome to InsightHub CMS
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100"
          >
          <Bell size={20} className="text-gray-600" />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="hidden rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 sm:block"
        >
          Logout
        </button>
      </div>
    </header>
  );
}