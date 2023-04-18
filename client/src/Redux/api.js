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
export const otpLogin = (data) => API.post("/user/otpLogin",data)
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
export const sameBloodGroup = (data) => API.get("/user/sameBloodGroup", { params: { bloodGroup: data } })
export const otherBloodGroup = (data) => API.get("/user/otherBloodGroup", { params: { bloodGroup: data } })
export const totalRequests = () => API.get("/receiver/totalRequests")
export const pendingRequests = () => API.get("/receiver/pendingRequests")
export const approvedRequests = () => API.get("/receiver/approvedRequests")
export const rejectedRequests = () => API.get("/receiver/rejectedRequests")

//admin
export const adminSignIn = (data) => API.post("/admin/adminLogin", data)
export const adminSignUp = (data) => API.post("/admin/adminSignup", data)
export const fetchUsers = () => API.get("/admin/users")
export const fetchUser = (id) => API.get(`/admin/users/${id}`)
export const donations = () => API.get("/admin/donations")
export const userDonations = (id) => API.get(`/admin/userDonations/${id}`)
export const requests = () => API.get("/admin/requests")
export const userRequests = (id) => API.get(`/admin/userRequests/${id}`)
export const approve = (id) => API.put(`/admin/requests/${id}/approve`)
export const reject = (id) => API.put(`/admin/requests/${id}/reject`)
export const approveDonation = (id) => API.put(`/admin/donations/${id}/approve`)
export const rejectDonation = (id) => API.put(`/admin/donations/${id}/reject`)
export const newBranch = (data) => API.post("/admin/newBranch", data)
export const branches = () => API.get("/admin/branches")
export const editBranch = (data) => API.put("/admin/editBranch", data)
export const removeBranch = (id) => API.delete(`/admin/removeBranch/${id}`)
export const units = () => API.get("/admin/units")


//blood
export const getAvailableUnits = () => API.get("/blood/getAvailableUnits");
export const getTransfusion = () => API.get("/blood/getTransfusion");
export const getDonations = () => API.get("/blood/getDonations");


//stripe
export const paymentDetails = (id) => API.get("/stripe/paymentDetails?id=" + id);
export const fullPaymentDetails = () => API.get("/stripe/fullPaymentDetails");


//chat
export const allContacts=(id)=>API.get("/chat/allContacts?id="+id)
export const addMessage=(data)=>API.post("/chat/addMessage",data)
export const getAllMessage=(data)=>API.post("/chat/getAllMessage",data)