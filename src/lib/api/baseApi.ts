// Need to use the React-specific entry point to import createApi
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { addToast } from "@heroui/toast";
import Cookies from "js-cookie";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken") 
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithVerifyToken = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if ((result as any)?.error?.status === 401) {
    const message = ((result as any)?.error?.data as any)?.message ?? "Unauthorized";
    addToast({ description: String(message),color:"danger" });
  }
  return result;
};
// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithVerifyToken,
  tagTypes: ["users","single-user"],
  endpoints: () => ({}),
});
