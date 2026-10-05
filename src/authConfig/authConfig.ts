import { LoginResponse } from "@/app/(auth)/login/login.interface";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
declare module "next-auth" {
    interface User {
        tkn: string;
    }
}

export const authconfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "login to Fresh",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async function (credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          },
        );

   const body: LoginResponse = await response.json();

if (body.message === "success") {
  const { role, ...userData } = body.user;
  return { ...userData, tkn: body.token };
}

return null;
      },
    }),
  ],
  pages:{
    signIn: "/login",
  },
  callbacks:{
     jwt:function({ token, user}) {
        if(user){
            token.credentials=user.tkn;
        }
    return token;
  
     },
     session:function(param){
        
return param.session
     }
  }
};