import bcrypt from "bcrypt"

export async function genhash(password){
    const saltRounds = 10;
    const res = await bcrypt.hash(password,saltRounds)
    return res;
}

export async function compare(password,hash){
    
    const res =await bcrypt.compare(password,hash)
    return res;
}