import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
  return <LoadingSpinner text="Loading..." />;
  }

  const hasAccess = user?.roles?.some((role) =>
    allowedRoles.includes(role)
  );

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}