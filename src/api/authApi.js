import axios from "./api"

export const registerUserApi = (data) => axios.post("/auth/register" ,data) ;
export const loginUserApi = (data) => axios.post("/auth/login" , data) ;
export const getGoogleOAuthUrl = () => {
  return `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
};
