import {useQuery , useMutation , useQueryClient} from "@tanstack/react-query"
import {createOneTrailService, deleteOneTrailService, getAllTrailService, getOneTrailService, joinTrailService, leaveTrailService, updateOneTrailService } from "../../services/admin/trailService"
import { toast } from "react-toastify"

export const useAdminTrail = (filters = {}) => {
    const query = useQuery (
        {
        
            queryKey : ["admin_trail", filters],
            
            queryFn : () => getAllTrailService(filters),

            keepPreviousData: true,
        }
    );

    const trails = query.data?.data || [];
    const pagination = query.data?.pagination || {};

    return {
        ...query,
        trails,
        pagination
    };
};

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

export const useJoinTrail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // The key for this mutation
        mutationKey: ["join_trail"],

        // The function that will be executed
        mutationFn: (id) => joinTrailService(id),

        onSuccess: (data) => {
            toast.success(data?.message || "Successfully joined the trail!");
            
            queryClient.invalidateQueries({ queryKey: ["admin_trail"] });
            queryClient.invalidateQueries({ queryKey: ["admin_trail_detail"] });
            
        },

        onError: (err) => {
            toast.error(err.message || "Failed to join trail.");
        },
    });
};

export const useLeaveTrail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["leave_trail"],
        
        mutationFn: (id) => leaveTrailService(id),

        onSuccess: (data) => {
            toast.success(data?.message || "Successfully left the trail!");

            queryClient.invalidateQueries({ queryKey: ["admin_trail"] });
            queryClient.invalidateQueries({ queryKey: ["admin_trail_detail"] });

        },

        onError: (err) => {
            toast.error(err.message || "Failed to leave trail.");
        },
    });
};