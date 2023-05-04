import { POST } from "./apiUtils";

const RECIPE_SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
console.log("Reading from env file: " + RECIPE_SERVER_BASE_URL);

export const registerUser = async (userData) => {
  const url = `${RECIPE_SERVER_BASE_URL}/api/users/register`;
  return await POST(url, userData, {});
};
