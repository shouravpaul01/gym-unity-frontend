import { user } from "@heroui/theme";
import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    getAllUsers: build.query({
        query: (args) => {
      
        const params=new URLSearchParams()
        if (args) {
          
          args?.forEach((arg:{ label: string; value: any })=> {
            if (arg?.value) {
              
              params.append(arg.label, arg.value);
            }
          })
        }
       return {
         url: "user/",
        method: "GET",
        params:params
       }
      },
      providesTags: ["users"],
    }),
    
    getSingleUser: build.query({
      query: (email: string) => ({
        url: `user/single-user/${email}`,
        method: "GET",
      }),
      providesTags: ["singleUser"],
    }),
    
    updateUser: build.mutation({
      query: ({ userId, ...body }) => ({
        url: `user/update-user/${userId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags:["users"]
    }),
    
    updateUserRole: build.mutation({
      query: (arg) => ({
        url: `user/update-role/${arg.userId}?role=${arg.role}`,
        method: "PATCH",
        
      }),
    }),
   
    updateUserStatus: build.mutation({
      query: (arg) => ({
        url: `user/update-status/${arg.userId}?isBlocked=${arg.isBlocked}`,
        method: "PATCH",
        
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} =userApi