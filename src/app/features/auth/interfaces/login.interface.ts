import { User } from "./user.interface";

export interface LoginUser {
    user: User;
    token: string;
}