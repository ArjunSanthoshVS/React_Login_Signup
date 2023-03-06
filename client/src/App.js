import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/User/Signup/Signup";
import Login from "./components/User/Login/Login"
import Home from "./components/User/Home/Home";
import AdminSignup from "./components/Admin/Signup/AdminSignup"
import AdminLogin from "./components/Admin/Login/AdminLogin";
import Users from "./components/Admin/Users/Users.jsx"
import Profile from "./components/User/Profile/Profile";

function App() {

  const user = JSON.parse(localStorage.getItem("userToken"));
  const admin = localStorage.getItem("adminToken");


  return (
    <div className="App">
      <Routes>
        {/* User */}
        {/* {user && <Route path="/" exact element={<Home />} />}
        {user && <Route path="/signup" exact element={<Navigate replace to='/' />} />}
        {user && <Route path="/login" exact element={<Navigate replace to='/' />} />} */}
        <Route path="/" exact element={<Home />}/>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        {/* <Route path="/" exact element={<Navigate replace to='/login' />} /> */}
        <Route path="/donor" exact element={<Profile />} />

        {/* Admin */}
        {admin && <Route path="/admin" exact element={<Users />} />}
        {admin && <Route path="/admin_signup" exact element={<Navigate replace to='/admin' />} />}
        {admin && <Route path="/admin_login" exact element={<Navigate replace to='/admin' />} />}
        <Route path="/admin_login" exact element={<AdminLogin />} />
        <Route path="/admin_signup" exact element={<AdminSignup />} />
        <Route path="/admin" exact element={<Navigate replace to='/admin_login' />} />

      </Routes>
    </div >
  );
}

export default App;
