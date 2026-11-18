import { User } from "./user.interface";

export type RegisterUser = Omit<User, "id" | "createdAt" | "updatedAt"> & {
    password: string;
};