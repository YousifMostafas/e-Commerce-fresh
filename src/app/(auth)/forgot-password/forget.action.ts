"use server"
export async function forgetpassword(email : string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })
    const data = response.json()
    return data
}


export async function ResetCode(resetCode : string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
    })
    const data = response.json()
    return data
}
export async function ResetPassword(email : string , newPassword : string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email , newPassword}),
    })
    const data = response.json()
    return data
}