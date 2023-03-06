import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

export const signIn=(data)=>API.post("/user/login",data)
export const signUp=(data)=>API.post("/user/signup",data)
