import { user } from "@heroui/theme";
import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    getAllUsers: build.query({
      query: () => ({
        url: "user/",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    
    getSingleUser: build.query({
      query: (email: string) => ({
        url: `user/single-user/${email}`,
        method: "GET",
      }),
      providesTags: ["single-user"],
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
      invalidatesTags:["users"]
    }),
   
    updateUserStatus: build.mutation({
      query: (arg) => ({
        url: `user/update-status/${arg.userId}?isBlocked=${arg.isBlocked}`,
        method: "PATCH",
        
      }),
      invalidatesTags:["users"]
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