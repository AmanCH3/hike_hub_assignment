import { getAllTrailApi , getOneApiTrailApi , createOneTrailApi , deleteOneTrailApi , updateOneTrailApi } from "../../api/admin/trailApi";

export const getAllTrailService = async () => {
    try  {
        const response = await getAllTrailApi() 
        return response.data
    }
    catch(err){
        throw err.response?.data || {messasge : "Failed to fetch"}
    }

}

export const createOneTrailService = async (data) => {
    try {
        const response = await createOneTrailApi(data) 
        return response.data

    }
    catch(err){
        throw err.response?.data || {message : "failed to create"}
    }
}


export const getOneTrailService = async (id) => {
    try {
        const response = await getOneApiTrailApi(id) 
        return response.data

    }
    catch(err){
        throw err.response?.data || {message : "Failed to load"}
    }
}


export const updateOneTrailService = async (id , data) => {
    try {
        const response = await updateOneTrailApi(id , data) 
        return response.data

    }
    catch(err){
        throw err.response?.data || {message : "failed to updated"}
    }
}

export const deleteOneTrailService = async(id) => {
    try {
        const response = await deleteOneTrailApi(id)
        return response.data 

    }
    catch(err){
        throw err.response?.data || {message : "failed to delete"}
    }
}