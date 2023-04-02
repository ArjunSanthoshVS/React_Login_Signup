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
export const donationHistory = (id) => API.get("/donor/donation_history?id=" + id)
export const request = (data) => API.post("/receiver/request", data)
export const transfusionHistory = (id) => API.get("/receiver/transfusion_history?id=" + id)
export const cancelRequest = (id) => API.put(`/receiver/cancel/${id}`)
export const allDistricts = () => API.get("/user/allDistricts")
export const districtChoose = (data) => API.get("/user/districtChoose", { params: { district: data } });
export const pateintDetails = () => API.get("/donor/pateintDetails")
export const transfusionDistricts = () => API.get("/donor/transfusionDistricts")
export const getBranches = (data) => API.get("/donor/getBranches", { params: { district: data } })
export const totalDonors = () => API.get("/donor/totalDonors")
export const totalUnits = () => API.get("/user/totalUnits")
export const totalReceivers = () => API.get("/receiver/totalReceivers")

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
export const newBranch = (data) => API.post("/admin/newBranch", data)
export const branches = () => API.get("/admin/branches")
export const editBranch = (data) => API.put("/admin/editBranch", data)
export const removeBranch = (id) => API.delete(`/admin/removeBranch/${id}`)
export const units = () => API.get("/admin/units")


//blood
export const getAvailableUnits = () => API.get("/blood/getAvailableUnits");
export const getTransfusion = () => API.get("/blood/getTransfusion");
export const getDonations = () => API.get("/blood/getDonations");
