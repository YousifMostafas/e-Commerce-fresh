import * as zod from "zod";
import { registerSchema } from "./register.zod";
export type RegisterFormData = zod.infer<typeof registerSchema>;

