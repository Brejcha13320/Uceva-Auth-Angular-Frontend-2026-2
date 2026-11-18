import { User } from "./user.interface";

export interface ValidateToken {
  authorization: boolean;
  user?: User;
  error?: string;
}