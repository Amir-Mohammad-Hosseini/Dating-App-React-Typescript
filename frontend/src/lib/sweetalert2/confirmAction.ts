import Swal, {
  type SweetAlertIcon,
  type SweetAlertInput,
  type SweetAlertOptions,
} from "sweetalert2";

type ConfirmActionProps = {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  icon?: SweetAlertIcon;
  confirmButtonColor?: string;
  input?: SweetAlertInput;
  inputPlaceholder?: string;
  html?: string;
  inputOptions ?: object,
  showCancelButton ?: boolean
  didOpen?: SweetAlertOptions["didOpen"];
  preConfirm?: SweetAlertOptions["preConfirm"];
  inputValidator ?: (value : any) => void
};

export const confirmAction = async ({
  title = "Are you sure?",
  text = "",
  confirmButtonText = "Yes, confirm",
  icon = "warning",
  confirmButtonColor = "#1e40af",
  input,
  html,
  didOpen,
  inputPlaceholder,
  inputOptions,
  showCancelButton = true,
  preConfirm,
}: ConfirmActionProps) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    input,
    html,
    didOpen,
    inputPlaceholder,
    preConfirm,
    showCancelButton,
    confirmButtonText,
    cancelButtonText: "Cancel",
    confirmButtonColor,
    cancelButtonColor: "#dc2626",
    reverseButtons: true,
    inputOptions,
  focusCancel: !input && !html,
    showLoaderOnConfirm: !!preConfirm,
    allowOutsideClick: () => !Swal.isLoading(),
  });

  return result.isConfirmed;
};
