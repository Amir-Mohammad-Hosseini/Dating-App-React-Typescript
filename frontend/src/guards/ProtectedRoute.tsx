import { Navigate, Outlet } from "react-router";
import useAppStore from "../lib/zustand/store";

const ProtectedRoute = () => {
  const user = useAppStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!user.hasProfile) {
    return <Navigate to="/onboarding" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;