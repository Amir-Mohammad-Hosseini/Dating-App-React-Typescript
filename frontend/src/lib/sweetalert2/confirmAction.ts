import Swal, { type SweetAlertIcon } from 'sweetalert2';

type ConfirmActionProps = {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  icon?: SweetAlertIcon;
};


export const confirmAction = async ({
  title = 'Are you sure?',
  text = '',
  confirmButtonText = 'Yes, confirm',
  icon = 'warning',
} : ConfirmActionProps) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#1e40af',
    cancelButtonColor: '#dc2626',
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
};