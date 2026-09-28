import { RouterProvider } from "react-router";
import router from "./routes/router";
import { useEffect } from "react";
import getSession from "./services/api/Auth/Session/getSession";
import useAppStore from "./lib/zustand/store";
const App = () => {
  useEffect(() => {
    getSession().then((data) => {
      if(data === "") {
        useAppStore.getState().logoutUser()
      }
    })
  })
  return <RouterProvider router={router} />;
};

export default App;
