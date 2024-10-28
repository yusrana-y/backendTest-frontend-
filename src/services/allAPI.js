import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

//registerAPI called by Auth

export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

//loginAPI called by Auth

export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}