import {Route, Routes } from "react-router-dom"
import Login from "../../modules/student/pages/Login.tsx"
import Register from "../../modules/student/pages/Register.tsx"
import Home from "../component/home.tsx"

const AppRoutes = () => {
  return (<>
    <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
  </>)
}
export default AppRoutes
