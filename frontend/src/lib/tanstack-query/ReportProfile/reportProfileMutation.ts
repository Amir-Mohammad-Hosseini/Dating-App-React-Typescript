import { toast } from "sonner";
import postReportUser from "../../../services/api/ReportProfile/postReportUser";
import queryClient from "../queryClient";

const reportProfileMutation = () => {
  return {
    mutationFn: postReportUser,
    onSuccess: (message: unknown) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
      if (typeof message === "string" && message.startsWith("Reported")) {
        toast.success("Thanks, your report was sent.");
      } else if (typeof message === "string") {
        toast.info(message);
      } else {
        toast.error("Could not send the report. Try again.");
      }
    },
    onError: () => {
      toast.error("An error occurred. Try again later.");
    },
  };
};

export default reportProfileMutation;
