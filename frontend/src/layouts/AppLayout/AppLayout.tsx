import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const isLogin = true;

const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/discover");
    } else {
      navigate("/welcome");
    }
  }, []);
  return <Outlet />;
};

export default AppLayout;
