import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { createOneGroupService , updateOneGroupService, getAllGroupService , getOneGroupService , deleteOneGroupService , joinOneGroupService, denyJoinRequestService, approveJoinRequestService } from "../services/groupService";
import { toast } from "react-toastify";
import { useState } from "react";



export const useGroup = (initialPage = 1, initialLimit = 10, initialSearch = "") => {

    const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
    const query = useQuery (
        {
            queryKey : ['group', page , limit, search],
            queryFn : () => getAllGroupService() ,
             keepPreviousData: true,
        }
    )

    const group = query.data?.data || []  
    const pagination = query.data?.pagination || { total: 0, page: initialPage, limit: initialLimit, totalPages: 1 };  
    return  {
        ...query ,
        group ,
         pagination,
    setPage,
    setLimit,
    setSearch
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
                toast.success("Group updated successfully!")
                queryClient.invalidateQueries(
                    [
                        "group" , "group_detail"
                    ]
                )
            } ,
            onError : (err) => {
                toast.error(err.message || "Group update failed")
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