"use server"
import { ICurrentTookenData } from "@/src/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentuser = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value;
  let decodedResult: Partial<ICurrentTookenData> = {};
  if (accessToken) {
    const decoded: ICurrentTookenData = await jwtDecode(accessToken);
    decodedResult = decoded;
  }
  return decodedResult;
};
export const logoutUser = async () => {
  
    
  const cookieStore = await cookies()
  cookieStore.delete("accessToken");
  redirect("/login");
  
};