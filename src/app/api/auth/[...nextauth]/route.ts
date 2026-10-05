import { authconfig } from "@/authConfig/authConfig";
import NextAuth from "next-auth";
const{handlers:{GET , POST}}=NextAuth(authconfig);
export { GET, POST };