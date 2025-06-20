import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { createUserApi , getUserApi , deleteUserApi , updateUserApi } from "../../api/authApi";
import { toast } from "react-toastify";


// export const useAdminUser =() => {
//     const query = useQuery (
//         {
//             queryKey : ["admin_user"],
//             queryFn : () => get
//         }
//     )
// }