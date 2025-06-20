import axios from "./api"

export const registerUserApi = (data) => axios.post("/auth/register" ,data) ;
export const loginUserApi = (data) => axios.post("/auth/login" , data) ;
export const createUserApi = (data) => axios.post("/user/create" ,data) ;
export const getUserApi = (data) => axios.get('/user/' ,data) ;
export const updateUserApi = (id ,data) => axios.put('/user/' + id  , data) ;
export const deleteUserApi = (id, data) => axios.delete('/user/' + id ,data)

