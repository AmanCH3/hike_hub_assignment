import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { createOneGroupService , updateOneGroupService, getAllGroupService , getOneGroupService , deleteOneGroupService , joinOneGroupService } from "../services/groupService";
import { toast } from "react-toastify";
import { group } from "console";
import { deleteOneTrailService } from "../services/admin/trailService";


export const useGroup = () => {
    const query = useQuery (
        {
            queryKey : ['admin_group'],
            queryFn : () => getAllGroupService()
        }
    )

    const group = query.data?.data || []
    return  {
        ...query ,
        group
    }
}

export const useCreateGroup = () => {
    const queryClient = useQueryClient()
    return useMutation (
        {
            mutationKey : ['create_group'],
            mutationFn : createOneGroupService,
            onSuccess : () => {
                queryClient 
                .invalidateQueries (
                    'group'
                )
            }
        }
    )
}

export const useGetOneGroup = (id) => {
    const query = useQuery (
        {
            queryKey : ["group_detail" , id] ,
            queryFn : () => getOneGroupService(id) ,
            enabled : !!id ,
            retry : false
        }
    )

    const group = query.data?.data || {}
    return{
        ...query ,
        group
    }
}

export const useUpdateOneGroup = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn : ({id , data}) => updateOneGroupService(id, data) ,
            mutationKey : ["group_update"] ,
            onSuccess : () => {
                toast.success("Updated")
                queryClient.invalidateQueries(
                    [
                        "group" , "group_detail"
                    ]
                )
            } ,
            onError : (err) => {
                toast.error(err.message || "Updated failed")
            }
        }
    )
}

export const useDeleteOneGroup  = () => {
    const queryClient = useQueryClient()
    return useMutation (
        {
            mutationKey : ['group_delete'] ,
            mutationFn : deleteOneTrailService ,
            onSuccess : () => {
                toast.success("Group deleted successful")
                queryClient.invalidateQueries(
                    (['group'])
                )
            } ,
            onError : (err) =>{
                toast.error(err.message || "Delete Failed")
            }
        }
    )
}