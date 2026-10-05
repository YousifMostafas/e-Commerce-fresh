import { toast } from "react-toastify";
import { RegisterAction } from "./register.action";
import { RegisterFormData } from "./register.interface";
import { useRouter } from "next/navigation";

export async function sendDataRegister(userData: RegisterFormData) {
  return await RegisterAction(userData);

}
