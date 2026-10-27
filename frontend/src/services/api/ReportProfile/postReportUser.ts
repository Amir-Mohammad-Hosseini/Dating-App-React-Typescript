import customFetch from "../../../lib/axios/customFetch";

const postReportUser = async (userId: number | string) => {
  const response = await customFetch.post(`browsing/reportuser/${userId}`);
  console.log(response)
  return response.data;
};

export default postReportUser;
