import * as zod from "zod";
export const registerSchema = zod.object({
  name: zod.string(),
  email: zod.email(),
  password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  confirmPassword: zod.string(),
  PhoneNumber: zod.string().regex(/^01[0125]\d{8}$/),
}); 