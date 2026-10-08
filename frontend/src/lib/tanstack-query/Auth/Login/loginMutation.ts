import { toast } from "sonner";
import postLogin from "../../../../services/api/Auth/Login/postLogin";
import type { NavigateFunction } from "react-router";
import useAppStore from "../../../zustand/store";
import type { User } from "../../../../types/user";

const loginMutation = (navigate: NavigateFunction) => {
  return {
    mutationFn: postLogin,
    onSuccess: (data: any) => {
      const user: User = {
        id: data.userid,
        username: data.username,
        firstname: data.firstname,
        hasProfile: data.location !== null,
      };

      toast("Logged in successfully");
      useAppStore.getState().setUser(user);
      navigate(user.hasProfile ? "/discover" : "/onboarding" , {
        replace : true
      });
    },
    onError: (error: Error) => {
      const message = error.message || "An error occurred while logging";
      toast(message);
    },
  };
};

export default loginMutation;
