
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {

  const { user, authLoading } = useSelector(
    (state) => state.auth
  );

  // Still checking the cookie/session
  if (authLoading) {
    return <div>Checking authentication...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in
  return <Outlet />;
}