import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    else return { error: error.message || error };
  }
};

export const verifyEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
