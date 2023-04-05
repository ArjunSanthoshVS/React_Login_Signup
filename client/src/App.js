import { Routes, Route, Navigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
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
import ReceiverHome from "./components/User/Receiver/ReceiverHome/ReceiverHome";
import DonateBlood from "./components/User/Donor/Donate/DonateBlood";
import RequestBlood from "./components/User/Receiver/Request/RequestBlood";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import DonationHistory from "./components/User/Donor/DonationHistory/DonationHistory";
import Donations from "./components/Admin/Donations/Donations";
import Requests from "./components/Admin/Requests/Requests";
import RequestHistory from "./components/User/Receiver/RequestHistory/RequestHistory";
import Branches from "./components/Admin/Branches/Branches";
import Blood from "./components/Admin/Blood/Blood";
import NearByPatients from "./components/User/Donor/NearByPatients/NearByPatients";
import Report from "./components/Admin/Report/Report";
import DonorBranches from "./components/User/Donor/Branches/DonorBranches";
import ReceiverBranch from "./components/User/Receiver/ReceiverBranch/ReceiverBranch";
import Test from "./components/test";

function App() {  

  const dispatch=useDispatch()

  const user = JSON.parse(localStorage.getItem("userToken"));
  const admin = JSON.parse(localStorage.getItem("adminToken"));

  useEffect(() => {
    dispatch(setUser(user))
    dispatch(setAdmin(admin))
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
        <Route path="/receiver"exact element={<ReceiverHome/>}/>
        <Route path="/donate"exact element={<DonateBlood/>}/>
        <Route path="/receive" exact element={<RequestBlood />} />
        <Route path="/donation_history" exact element={<DonationHistory />} />
        <Route path="/transfusion_history" exact element={<RequestHistory />} />
        <Route path="/patients" exact element={<NearByPatients />} />
        <Route path="/donorBranches" exact element={<DonorBranches />} />
        <Route path="/receiverBranches" exact element={<ReceiverBranch />} />
        <Route path="/test" exact element={<Test />} />
        

        {/* Admin */}
        {admin && <Route path="/dashboard" exact element={<Dashboard />} />}
        {admin && <Route path="/admin_signup" exact element={<Navigate replace to='/dashboard' />} />}
        {admin && <Route path="/admin_login" exact element={<Navigate replace to='/dashboard' />} />}
        {admin && <Route path="/view" exact element={<View />} />}
        {admin && <Route path="/users" exact element={<Users />} />}
        <Route path="/admin_login" exact element={<AdminLogin />} />
        <Route path="/admin_signup" exact element={<AdminSignup />} />
        <Route path="/admin" exact element={<Navigate replace to='/admin_login' />} />
        <Route path="/donations" exact element={<Donations />} />
        <Route path="/requests" exact element={<Requests />} />
        <Route path="/branches" exact element={<Branches />} />
        <Route path="/blood_groups" exact element={<Blood />} />
        <Route path="/blood_report" exact element={<Report />} />
      </Routes>
    </div >
  );
}

export default App;
