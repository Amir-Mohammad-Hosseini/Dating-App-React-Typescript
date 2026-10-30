import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const postReportUser = async (userId: number | string) => {
  const response = await customFetch.post(ENDPOINTS.REPORT_PROFILE(userId));

  return response.data;
};

export default postReportUser;
