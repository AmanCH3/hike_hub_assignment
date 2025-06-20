import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { getOneUserService , createOneUserService , deleteOneUserService , updateOneUserSerivce , getAllUserService } from "../../services/admin/userService";
import { toast } from "react-toastify";
import { useMatch } from "react-router-dom";


export const useAdminUser =() => {
    const query = useQuery (
        {
            queryKey : ["admin_user"],
            queryFn : () => getAllUserService()
        }
    )
    const users = query.data?.data || []
    return {
        ...query ,
        users
    }
}

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation (
        {
            mutationKey : ["admin_create_user"] ,
            mutationFn : createOneUserService,
            onSuccess : () => {
                queryClient 
                .invalidateQueries(
                    "admin_user"
                )
                toast.success("Created SuccessFully")
            }
        }
    )
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation (
        {
            mutationFn : ({id, data}) => updateOneUserSerivce(id, data) ,
            mutationKey : ["admin_user_update"],
            onSuccess : () => {
                queryClient.invalidateQueries (
                    [

                        "admin_user" , "admin_user_detail"
                    ]
                    
                )
                toast.success("Updated Successfully")
            },
            onError : (err) => {
                toast.error(err.message || "Failed to Updated")
            }
        }
    )
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation (
        {
            mutationFn : deleteOneUserService ,
            mutationKey : ['admin_user_delete'] ,
            onSuccess : () => {
                toast.success("Deleted Succesfully")
                queryClient.invalidateQueries(
                    (
                        ['admin_user']
                    )
                )
            },
            onError : (err) => {
                toast.error(err.message || "Failed to Delete")
            }
        }
    )
}

