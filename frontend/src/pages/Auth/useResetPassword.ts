import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordSchema, { type ResetPasswordFormType } from "../../lib/zod/Auth/extendSchemas/resetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import resetPasswordMutation from "../../lib/tanstack-query/Auth/ResetPassword/resetPasswordMutation";

const useResetPassword = () => {
  const {username , code : token} = useParams()
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ResetPasswordFormType>({
      resolver: zodResolver(resetPasswordSchema),
    });

    const { mutate : resetPasswordMutate, isPending : isResetPasswordMutatePending } = useMutation(resetPasswordMutation(navigate));

  const onValid = (data : ResetPasswordFormType) => {
    resetPasswordMutate({ user : username! , code : token! , ...data})
  }
    
  return {token,register , handleSubmit , errors , isResetPasswordMutatePending , onValid}
}

export default useResetPassword