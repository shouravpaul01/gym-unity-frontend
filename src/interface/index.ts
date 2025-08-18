export type UserRole = "admin" | "trainer" | "trainee";
  
  export interface IUserInfo {
    _id?: string;
    name: string;
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