import postVerifyEmail from "../../../../services/api/Auth/VerifyEmail/postVerifyEmail";
import queryKeys from "../../queryKeys";

const verifyEmailQuery = (username?: string, code?: string) => {
  return {
    queryKey: queryKeys.auth.verifyEmail,
    queryFn: () => postVerifyEmail(username!, code!),
  };
};

export default verifyEmailQuery;
