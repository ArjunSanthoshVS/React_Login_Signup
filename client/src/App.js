import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/User/Signup/Signup";
import Login from "./components/User/Login/Login"
import Home from "./components/User/Home/Home";
import AdminSignup from "./components/Admin/Signup/AdminSignup"
import AdminLogin from "./components/Admin/Login/AdminLogin";
import Users from "./components/Admin/Users/Users.jsx"
import Profile from "./components/User/Profile/Profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./Redux/Features/User/userSlice";
import { setAdmin } from "./Redux/Features/Admin/adminSlice";
import View from "./components/Admin/Users/View";
import DonorHome from "./components/User/Donor/DonorHome/DonorHome";

function App() {  

  const dispatch=useDispatch()

  const user = JSON.parse(localStorage.getItem("userToken"));
  const admin = JSON.parse(localStorage.getItem("adminToken"));

  useEffect(() => {
    dispatch(setUser(user))
    dispatch(setAdmin(admin))
    console.log(user);
    console.log(admin);
  })

  return (
    <div className="App">
      <Routes>
        {/* User */}
        {user && <Route path="/" exact element={<Home />} />}
        {user && <Route path="/signup" exact element={<Navigate replace to='/' />} />}
        {user && <Route path="/login" exact element={<Navigate replace to='/' />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to='/login' />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/donor"exact element={<DonorHome/>}/>

        {/* Admin */}
        {admin && <Route path="/admin" exact element={<Users />} />}
        {admin && <Route path="/admin_signup" exact element={<Navigate replace to='/admin' />} />}
        {admin && <Route path="/admin_login" exact element={<Navigate replace to='/admin' />} />}
        {admin && <Route path="/view" exact element={<View />} />}
        <Route path="/admin_login" exact element={<AdminLogin />} />
        <Route path="/admin_signup" exact element={<AdminSignup />} />
        <Route path="/admin" exact element={<Navigate replace to='/admin_login' />} />

      </Routes>
    </div >
  );
}

export default App;
