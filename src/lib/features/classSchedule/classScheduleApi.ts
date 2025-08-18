import { baseApi } from "../../api/baseApi";

export const classScheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    createClassSchedule: build.mutation({
      query: (body) => ({
        url: "classSchedule/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["classSchedules"],
    }),

    
    getAllClassSchedules: build.query({
      query: () => ({
        url: "classSchedule/",
        method: "GET",
      }),
      providesTags: ["classSchedules"],
    }),

    getClassScheduleById: build.query<any, string>({
      query: (classScheduleId) => ({
        url: `classSchedule/single-class-schedule/${classScheduleId}`,
        method: "GET",
      }),
      providesTags: ["classSchedule"],
    }),

    
    updateClassSchedule: build.mutation({
      query: ({ classScheduleId, payload }) => ({
        url: `classSchedule/update-user/${classScheduleId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["classSchedules", "classSchedule"],
    }),

    
    updateClassScheduleStatus: build.mutation({
      query: ({ classScheduleId, isActive }) => ({
        url: `classSchedule/update-status/${classScheduleId}?isActive=${isActive}`,
        method: "PATCH",
       
      }),
      invalidatesTags: ["classSchedules", "classSchedule"],
    }),
  }),
});

export const {
  useCreateClassScheduleMutation,
  useGetAllClassSchedulesQuery,
  useGetClassScheduleByIdQuery,
  useUpdateClassScheduleMutation,
  useUpdateClassScheduleStatusMutation,
} = classScheduleApi;