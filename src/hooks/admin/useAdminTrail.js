import {useQuery , useMutation , useQueryClient} from "@tanstack/react-query"
import {createOneTrailService, deleteOneTrailService, getAllTrailService, getOneTrailService, updateOneTrailService } from "../../services/admin/trailService"
import { toast } from "react-toastify"

export const useAdminTrail = () => {
    const query = useQuery (
        {
            queryKey : ["admin_trail"] ,
            queryFn : () => getAllTrailService()
        }
    )
    const trails = query.data?.data || []
    return {
        ...query,
        trails
    }
}

export const useCreateTrail = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationKey : ["admin_create_trail"] ,
            mutationFn : createOneTrailService,
            onSuccess : () => {
                queryClient 
                .invalidateQueries(
                    "admin_trail"
                )
            }
        }
    )
}

export const useGetOneTrail = (id) => {
    const query = useQuery (
        {
            queryKey : ["admin_trail_detail" , id] ,
            queryFn : () => getOneTrailService(id) ,
            enabled : !!id ,
            retry : false // tries 3 times default

        }
    )

    const trail = query.data?.data || {}
    return {
        ...query ,
        trail
    }
}

export const useUpdateOneTrail = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn : ({id , data}) => updateOneTrailService(id, data) ,
            mutationKey : ["admin_trail_update"] ,
            onSuccess : () => {
                toast.success("Updated")
                queryClient.invalidateQueries(
                    [
                        "admin_trail" , "admin_trail_detail"
                    ]
                )
            },
            onError : (err) => {
                toast.error(err.message || "Updated Failed")
            }
        }
    )
}

export const useDeleteOneTrail = () => {
    const queryClient = useQueryClient()
    return useMutation (
        {
            mutationFn : deleteOneTrailService,
            mutationKey : ["admin_trail_delete"],
            onSuccess : () => {
                toast.success("Deleted")
                queryClient.invalidateQueries(
                    
                (      
                        [ "admin_trail"]
                )
                )
            } ,
            onError : (err) => {
                toast.error(err.message || "Delete Failed")
            }
        }
    )
}