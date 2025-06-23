import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { createOneGroupService , updateOneGroupService, getAllGroupService , getOneGroupService , deleteOneGroupService , joinOneGroupService, denyJoinRequestService, approveJoinRequestService } from "../services/groupService";
import { toast } from "react-toastify";
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
            mutationFn : deleteOneGroupService ,
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

export const useJoinGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinOneGroupService,
    onSuccess: (data) => {
      toast.success(data?.message || "Successfully joined group!");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["group_detail"] });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to join group");
    },
  });
};


export const useRequestToJoinGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ groupId, data }) => requestToJoinGroupService(groupId, data),
        onSuccess: (data) => {
            toast.success(data?.message || "Request sent to admin for approval!");
            queryClient.invalidateQueries({ queryKey: ['group_detail', data?.data?.groupId] });
        },
        onError: (err) => {
            toast.error(err?.message || "Failed to send request.");
        },
    });
};

export const useApproveJoinRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ groupId, requestId }) => approveJoinRequestService(groupId, requestId),
        onSuccess: (data) => {
            toast.success(data?.message || "Request approved!");
            queryClient.invalidateQueries({ queryKey: ['group_detail', data?.data?.groupId] });
        },
        onError: (err) => {
            toast.error(err.message || "Approval failed.");
        }
    });
};


export const useDenyJoinRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ groupId, requestId }) => denyJoinRequestService(groupId, requestId),
        onSuccess: (data) => {
            toast.info(data?.message || "Request denied.");
            queryClient.invalidateQueries({ queryKey: ['group_detail', data?.data?.groupId] });
        },
        onError: (err) => {
            toast.error(err.message || "Action failed.");
        }
    });
};