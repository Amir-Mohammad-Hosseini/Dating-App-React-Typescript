import customFetch from "../../../lib/axios/customFetch";
import type { MyProfileFormType } from "../../../lib/zod/MyProfile/myProfileSchema";

const postUpdateMyProfileForm = async (profileDatas: MyProfileFormType) => {
  const response = await customFetch.post("profile/editsettings", profileDatas);
    if (response.data !== true) throw new Error(String(response.data));
  return response.data;
};
export default postUpdateMyProfileForm;
