import axios from "../api" ;

export const getAllGroupApi = (params) => axios.get("/group/", {params})

export const createOneGroupApi = (groupData) => 
    axios.post("/group/create/" , groupData , {
        headers : {
            'Content-Type' : 'multipart/form-data' ,
        }
    }) ;
 

export const getOneGroupApi = (id) => axios.get("/group/" + id)

export const updateOneGroupApi = (id , data) => {
    return axios.put("/group/" + id , data) ;
} ;

export const deleteOneGroupApi = (id) => {
    return axios.delete("/group/" + id)
}

export const joinOneGroupApi = (id) => {
    return axios.post('/group/' + id + '/join')
}

export const requestToJoinGroupApi = (id, data) => {
    return axios.post(`/group/${id}/request-join`, data);
};

export const approveJoinRequestApi = (groupId, requestId) => {
    return axios.patch(`/group/${groupId}/requests/${requestId}/approve`);
};

export const denyJoinRequestApi = (groupId, requestId) => {
    return axios.patch(`/group/${groupId}/requests/${requestId}/deny`);
};

export const pendingJoinRequestApi = () =>{
    return axios.get('/group/requests/pending')
}