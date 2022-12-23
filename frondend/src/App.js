import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login"
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main/Main";



function App() {

  const user = localStorage.getItem("token")

  return (
    <div className="App">
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to='/login' />} />
      </Routes>
    </div >
  );
}

export default App;
