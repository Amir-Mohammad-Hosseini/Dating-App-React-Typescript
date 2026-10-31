import { useForm } from "react-hook-form";
import type { SignupFormType } from "../../lib/zod/Auth/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "../../lib/zod/Auth/signupSchema";
import { useMutation } from "@tanstack/react-query";
import signupMutation from "../../lib/tanstack-query/Auth/Register/signupMutation";
import { useNavigate } from "react-router";

const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate()
  const {mutate : signupMutate , isPending : isSignupPending } = useMutation(signupMutation(navigate))

  const onValid = (data: SignupFormType) => {
    signupMutate(data)
  };

  return {register , handleSubmit , errors , isSignupPending , onValid}
}

export default useRegister