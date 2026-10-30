import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";


const patchReadNotifications = async (
  notifId: number | string,
) => {
  const response = await customFetch.patch(
    ENDPOINTS.MY_PROFILE.NOTIFICATIONS.READ(notifId),
  );

  return response.data;
};

export default patchReadNotifications;