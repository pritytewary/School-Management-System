import { baseApiRequest } from "../../lib/api-request";

const getTeacherData = async (_id) => {
  try {
    const response = await baseApiRequest({
      url: `/admin/user/get/${_id}`,
      method: "GET",
    });
    return response.data || {};
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    return {};
  }
};

export default getTeacherData;
