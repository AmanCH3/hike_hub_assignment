import axios from "../api" ;

export const getAllGroupApi = () => axios.get("/group/")

export const createOneGroupApi = (groupData) => 
    axios.post("/group/create/" , groupData , {
        headers : {
            'Content-Type' : 'multipart/form-data' ,
        }
    } ,)


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

