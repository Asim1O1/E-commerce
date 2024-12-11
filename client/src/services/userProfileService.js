import formatError from "../utils/errorUtils";
import axiosInstance from "../utils/axiosInstance";

const getUserProfileService = async () => {
  try {
    const response = await axiosInstance(`/api/users/getUserProfile`, {
      withCredentials: true,
    });
    console.log("The response in getUserProfile was: ", response);
    return response.data;
  } catch (error) {
    const formattedError = formatError(error);
    return formattedError;
  }
};

export const updateUserProfileService = async (updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/updateUserProfile`,
      updatedData,
      {
        withCredentials: true,
      }
    );
    console.log("The response in updateUserProfile was: ", response);
    return response.data;
  } catch (error) {
    const formattedError = formatError(error);
    return formattedError;
  }
};

const userServices = { getUserProfileService, updateUserProfileService };

export default userServices;
