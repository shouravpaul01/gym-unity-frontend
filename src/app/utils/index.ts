import { getCurrentuser } from "@/src/services/auth";
import { IUserInfo } from "@/src/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const isAccessGranted = (requiredRoles: string[]) => {
    const getCurrentUser= Cookies.get("accessToken") 
    const currentUser:IUserInfo=jwtDecode(getCurrentUser!)
    if (currentUser?.role && requiredRoles.includes(currentUser.role)) {
        return true
    }else{
        return false
    }

};
