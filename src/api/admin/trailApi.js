
import axios from "../api"


export const getAllTrailApi = (params) => {
  return axios.get("trail/", { params });
};

export const createOneTrailApi = (trailData) => 
    axios.post("/trail/create/" , trailData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    },)

export const getOneApiTrailApi = (id) => axios.get('/trail/' + id) 


export const updateOneTrailApi = (id, data) => {
  return axios.put("/trail/" + id, data);
};

export const deleteOneTrailApi = (id) => {
   return axios.delete("/trail/" + id)
}

export const joinTrailApi = (id) => {
  return axios.post('trail/' + id + '/join-trail')
}

export const leaveTrailApi = (id) => {
  return axios.post('trail/' + id + "/leave-trail")
}