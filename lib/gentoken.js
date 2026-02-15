import jwt from "jsonwebtoken"

export const gentoken = async (userid)=>{
    console.log(userid)
    const token =  jwt.sign({userid},"thisismysecretkey")
    return token
}