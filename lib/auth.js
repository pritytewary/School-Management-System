import { baseApiRequest } from "./api-request";

export const getUserRole = async () => {
  try {
    const response = await baseApiRequest({
      url: "/api/auth/get-user-role",
      method: "GET",
    });
    return response.data.role;
  } catch (error) {
    console.error("Error fetching user role", error);
    return null;
  }
};
