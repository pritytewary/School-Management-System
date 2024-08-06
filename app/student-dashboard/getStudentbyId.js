import { baseApiRequest } from "../../lib/api-request";

const getStudentData = async (_id) => {
  try {
    const response = await baseApiRequest({
      url: `/admin/user/get/${_id}`,
      method: "GET",
    });
    return response.data || {};
  } catch (error) {
    console.error("Error fetching student data:", error);
    return {};
  }
};

export default getStudentData;
