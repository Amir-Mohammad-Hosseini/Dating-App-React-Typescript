import { Navigate, Outlet } from "react-router";
import useAppStore from "../lib/zustand/store";

const AuthRoute = () => {
  const user = useAppStore((state) => state.user);

  if (user) {
    return <Navigate to={user.hasProfile ? "/discover" : "/onboarding"} replace />;
  }
  return <Outlet />;
};

export default AuthRoute;