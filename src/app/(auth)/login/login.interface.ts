import * as zod from "zod";
import { loginSchema } from "./login.zod";
export type LoginFormData = zod.infer<typeof loginSchema>;


export interface LoginResponse {
  message: string
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  role: string
}
