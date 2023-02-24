import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/User/Signup/Signup";
import Login from "./components/User/Login/Login"
import Home from "./components/User/Home/Home";
import AdminSignup from "./components/Admin/Signup/AdminSignup"
import AdminLogin from "./components/Admin/Login/AdminLogin";
import Users from "./components/Admin/Users/Users.jsx"

function App() {

  const user = localStorage.getItem("token")

  return (
    <div className="App">
      <Routes>
        {/* User */}
        {user && <Route path="/" exact element={<Home />} />}
        {user && <Route path="/signup" exact element={<Navigate replace to='/home' />} />}
        {user && <Route path="/login" exact element={<Navigate replace to='/home' />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to='/login' />} />


        {/* Admin */}
        <Route path="/admin_login" exact element={<AdminLogin />} />
        <Route path="/admin_signup" exact element={<AdminSignup />} />
        <Route path="/admin" exact element={<Users />} />

      </Routes>
    </div >
  );
}

export default App;
