import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return <p className="text-gray-600">Loading...</p>;
  }

  const hasAccess = user?.roles?.some((role) =>
    allowedRoles.includes(role)
  );

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}