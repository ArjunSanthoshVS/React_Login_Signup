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
export const profilePicture = (data) => API.post("/user/profilePicture", data)
export const donate = (data) => API.post("/donor/donate", data)
export const donationHistory = (id) => API.get("/donor/donation_history?id="+id)
export const request = (data) => API.post("/receiver/request", data)
export const transfusionHistory = (id) => API.get("/receiver/transfusion_history?id="+id)
export const cancelRequest = (id) => API.put(`/receiver/cancel/${id}`)
//admin
export const adminSignIn = (data) => API.post("/admin/login", data)
export const adminSignUp = (data) => API.post("/admin/signup", data)
export const fetchUsers = () => API.get("/admin/users")
export const fetchUser = (id) => API.get(`/admin/users/${id}`)
export const donations = () => API.get("/admin/donations")
export const userDonations = (id) => API.get(`/admin/userDonations/${id}`)
export const requests = () => API.get("/admin/requests")
export const userRequests = (id) => API.get(`/admin/userRequests/${id}`)
export const approve = (id) => API.put(`/admin/requests/${id}/approve`)
export const reject = (id) => API.put(`/admin/requests/${id}/reject`)
export const approveDonation = (id) => API.put(`/admin/donations/${id}/approveDonation`)
export const rejectDonation = (id) => API.put(`/admin/donations/${id}/rejectDonation`)
