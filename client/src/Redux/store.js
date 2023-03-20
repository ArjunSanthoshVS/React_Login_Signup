import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/User/userSlice"
import adminReducer from "./Features/Admin/adminSlice"
import getUsersReducer from "./Features/Admin/getUsersSlice";
import getUserDetailsReducer from "./Features/Admin/getUserDetails";
// import DonateReducer from "./Features/User/DonateSlice";
import DistrictReducer from "./Features/User/DistrictSlice";
import BranchReducer from "./Features/User/BranchSlice";
// import TransfusionReducer from "./Features/User/TransfusionSlice";
import requestsReducer from  "./Features/Admin/requests"

export default configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        getUsers: getUsersReducer,
        userDetails: getUserDetailsReducer,
        // donate: DonateReducer,
        district: DistrictReducer,
        branch: BranchReducer,
        // transfusion: TransfusionReducer,
        requests:requestsReducer,
    },
    preloadedState: {
        user: {
            user:JSON.parse(localStorage.getItem('userToken'))
        }
    }
})