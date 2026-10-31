import { useQuery } from "@tanstack/react-query";
import verifyEmailQuery from "../../lib/tanstack-query/Auth/VerifyEmail/verifyEmailQuery";
import { useParams } from "react-router";

const useVerifyEmail = () => {
  const { username, code } = useParams();
  const {
    isPending: isVerifyEmailPending,
    isError: isVerifyEmailError,
    error: verifyEmailError,
  } = useQuery(verifyEmailQuery(username, code));

  return { isVerifyEmailPending , isVerifyEmailError , verifyEmailError}
}

export default useVerifyEmail