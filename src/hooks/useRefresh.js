import axios from "@/pages/api/axios";
import Cookies from "js-cookie";

export const refreshToken = async () => {
  try {
    const response = await axios.get("token/refresh");

    console.log(response);
    Cookies.set("token", response.data.data.accessToken);
    return response.data.data.accessToken;
  } catch (error) {
    throw error;
  }
};
