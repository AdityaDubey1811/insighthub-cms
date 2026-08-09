import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Posts", path: "/posts" },
  { name: "Create Post", path: "/posts/create" },
  { name: "Notifications", path: "/notifications" },
  { name: "Profile", path: "/profile" },
];

export default function Sidebar() {
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes("ADMIN");
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          InsightHub
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
    </aside>
  );
}