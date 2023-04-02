import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/User/userSlice"
import adminReducer from "./Features/Admin/adminSlice"
import getUsersReducer from "./Features/Admin/getUsersSlice";
import getUserDetailsReducer from "./Features/Admin/getUserDetails";

export default configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        getUsers: getUsersReducer,
        userDetails: getUserDetailsReducer,
    },
    preloadedState: {
        user: {
            user:JSON.parse(localStorage.getItem('userToken'))
        },
        admin: {
            admin:JSON.parse(localStorage.getItem('adminToken'))
        }
    }
})