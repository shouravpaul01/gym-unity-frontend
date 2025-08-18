import { SVGProps } from "react";
import { string } from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type UserRole = "admin" | "trainer" | "trainee";
  
  export interface IUserInfo {
    _id?: string;
    name: string;
    image?:string;
    email: string;
    role: UserRole;
    profile?: {
      age?: number;
      phone?: string;
      address?: string;
    };
    isBlocked:boolean,
    isDeleted:boolean,
    createdAt?: string;
    updatedAt?: string;
  }
  
  
  export interface ICurrentTookenData {
    _id?: string;
    name: string;
    image?:string;
    email: string;
    role: UserRole;
   
  }
  export interface IQuery {
  name: string;
  value: any;
};
export interface ISelectOption {value:any,label:string}
export interface IClassSchedule {
  _id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  trainer: IUserInfo | string;
  trainees: IUserInfo[];
  description?:string;
  isActive: boolean;
  isDeleted: boolean;
  
}