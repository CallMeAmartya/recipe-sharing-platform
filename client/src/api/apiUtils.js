import axios from "axios";

export const GET = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const POST = async (url, data, config = {}) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
