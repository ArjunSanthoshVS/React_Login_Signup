import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("userToken")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userToken")).token}`
    } else if (localStorage.getItem("adminToken")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("adminToken")).token}`
    }
    return req
})

//user
export const signIn = (data) => API.post("/user/login", data)
export const signUp = (data) => API.post("/user/signup", data)
export const profile = (data) => API.put("/user/profile", data)

//admin
export const adminSignIn = (data) => API.post("/admin/login", data)
export const adminSignUp = (data) => API.post("/admin/signup", data)
export const fetchUsers = () => API.get("/admin/users")
export const fetchUser = (id) => API.get(`/admin/users/${id}`)