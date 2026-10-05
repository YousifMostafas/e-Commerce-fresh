import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req : NextRequest){
    const pathName = req.nextUrl.pathname
const isAuth=pathName ==="/login" || pathName ==="/register"
const token = await getToken(
{
    req , 
    secret: process.env.AUTH_SECRET,
}

)
if(isAuth ){
if(token){
    return NextResponse.redirect(new URL("/" , req.url))
}
return NextResponse.next()
}


}
export const config = {
    matcher: ["/login" , "/register"]
}