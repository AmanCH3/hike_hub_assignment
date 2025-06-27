import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/api"; // Assuming your configured axios instance is here
import { toast } from "react-toastify";

// API function to get the current user's profile
const fetchMyProfile = async () => {
  const { data } = await axios.get("/user/me");
  return data.data;
};

// API function to update the current user's profile
const updateMyProfile = async (profileData) => {
  const { data } = await axios.put("/user/me", profileData);
  return data.data;
};

// Hook to get the user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchMyProfile,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// Hook to update the user profile
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (data) => {
      // Invalidate and refetch the profile data after a successful update
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });
};