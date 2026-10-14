import Swal, { type SweetAlertIcon, type SweetAlertInput, type SweetAlertOptions } from 'sweetalert2';

type ConfirmActionProps = {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  icon?: SweetAlertIcon;
  confirmButtonColor?: string;
  input?: SweetAlertInput;
  inputPlaceholder?: string;
  preConfirm?: SweetAlertOptions['preConfirm'];
};

export const confirmAction = async ({
  title = 'Are you sure?',
  text = '',
  confirmButtonText = 'Yes, confirm',
  icon = 'warning',
  confirmButtonColor = '#1e40af',
  input,
  inputPlaceholder,
  preConfirm,
}: ConfirmActionProps) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    input,
    inputPlaceholder,
    preConfirm,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancel',
    confirmButtonColor,
    cancelButtonColor: '#dc2626',
    reverseButtons: true,
    focusCancel: !input,
    showLoaderOnConfirm: !!preConfirm,
    allowOutsideClick: () => !Swal.isLoading(),
  });

  return result.isConfirmed;
};