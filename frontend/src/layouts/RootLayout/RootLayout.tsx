// layouts/RootLayout/RootLayout.tsx
import { useEffect } from "react";
import { Outlet } from "react-router";
import getSession from "../../services/api/Auth/Session/getSession";
import useAppStore from "../../lib/zustand/store";

const RootLayout = () => {
  useEffect(() => {
    getSession()
      .then((data) => {
        if (data === "") useAppStore.getState().logoutUser();
      })
      .catch(() => {});
  }, []);

  return <Outlet />;
};

export default RootLayout;