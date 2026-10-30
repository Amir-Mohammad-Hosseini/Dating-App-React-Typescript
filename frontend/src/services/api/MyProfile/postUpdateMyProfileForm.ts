import customFetch from "../../../lib/axios/customFetch";
import type { MyProfileFormType } from "../../../lib/zod/MyProfile/myProfileSchema";
import ENDPOINTS from "../endpoints";

const postUpdateMyProfileForm = async (profileDatas: MyProfileFormType) => {
  const response = await customFetch.post(
    ENDPOINTS.MY_PROFILE.EDIT_SETTINGS,
    profileDatas,
  );
  if (response.data !== true) throw new Error(String(response.data));
  return response.data;
};
export default postUpdateMyProfileForm;
