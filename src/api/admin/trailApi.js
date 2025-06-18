import { data } from "autoprefixer"
import axios from "../api"


export const getAllTrailApi = () => axios.get("trail/")

export const createOneTrailApi = (trailData) => 
    axios.post("/trail/create/" , trailData, {
})


export const getOneApiTrailApi = (id) => axios.get('/trail/' + id) 


export const updateOneTrailApi = (id, data) => {
  return axios.put("/trail/" + id, data);
};

export const deleteOneTrailApi = (id) => {
   return axios.delete("/trail/" + id)
}