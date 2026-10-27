import { useMutation } from "@tanstack/react-query";
import reportProfileMutation from "../../lib/tanstack-query/ReportProfile/reportProfileMutation";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import { REPORT_REASONS } from "../../utils/constants/conversation";

const useReportProfile = () => {
  const {
    mutate: reportProfileMutate,
    isPending: isReportProfileMutationPending,
  } = useMutation(reportProfileMutation());

  const handleShowReportSwal = async (matchId?: number | string) => {
    const isReportConfirm = await confirmAction({
      title: "Are you sure?",
      text: "Do you want to report this user?",
      confirmButtonText: "Report",
      icon: "warning",
      confirmButtonColor: "#1e40af",
      input: "select",
      inputOptions: REPORT_REASONS,
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
      inputValidator: (value: any) =>
        value ? undefined : "Please select a reason",
    });

    if (isReportConfirm) {
      reportProfileMutate(matchId!);
    }
  };

  return { handleShowReportSwal, isReportProfileMutationPending };
};

export default useReportProfile;
