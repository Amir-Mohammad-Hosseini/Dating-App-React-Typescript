import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormType } from "../../lib/zod/Auth/loginSchema";
import loginSchema from "../../lib/zod/Auth/loginSchema";
import loginMutation from "../../lib/tanstack-query/Auth/Login/loginMutation";
import { useNavigate } from "react-router";

const useLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginMutate, isPending: isLoginMutationPending } =
    useMutation(loginMutation(navigate));

  const onValid = (data: LoginFormType) => {
    loginMutate(data);
  };

  return { register, handleSubmit, errors, isLoginMutationPending, onValid };
};

export default useLogin;
