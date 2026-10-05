"use server"

import { getUserToken } from "@/app/myUtils"

export async function UpdateUserData(data : any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/users/updateMe/` , 
        {
            method:"PUT",
            headers:{
                "content-type":"application/json",
                token:await getUserToken() as string
            },
            body:JSON.stringify({data})
        }
    
    )
const res =await response.json()
return data
}