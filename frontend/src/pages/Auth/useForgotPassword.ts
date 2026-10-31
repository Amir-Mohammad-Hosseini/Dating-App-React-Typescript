import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordSchema, {
  type ForgotPasswordFormType,
} from "../../lib/zod/Auth/extendSchemas/forgotPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import forgotPasswordMutation from "../../lib/tanstack-query/Auth/ForgotPassword/forgotPasswordMutation";
import { useState } from "react";

const useForgotPassword = () => {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    mutate: forgotPasswordMutate,
    isPending: isForgotPasswordMutatePending,
  } = useMutation(forgotPasswordMutation(setSentTo));

  const onValid = (data: ForgotPasswordFormType) => {
    forgotPasswordMutate(data.email);
  };

  return {sentTo , setSentTo , register , handleSubmit , errors , isForgotPasswordMutatePending , onValid}
}

export default useForgotPassword