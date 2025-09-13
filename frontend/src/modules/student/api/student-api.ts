import axios from "axios";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL 
axios.defaults.baseURL=API_BASE_URL
export const doRegister=(userData:unknown)=>{
    console.log("API_BASE_URL",API_BASE_URL,"user data is ",userData)
    
    return axios.post("register",userData);
}

export const doLogin=(userData:unknown)=>{
    console.log("API_BASE_URL",API_BASE_URL,"user data is ",userData)
    
    return axios.post("login",userData);
}
