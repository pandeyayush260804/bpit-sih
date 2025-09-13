import {Route, Routes } from "react-router-dom"
import Login from "../../modules/student/pages/Login.tsx"
import Register from "../../modules/student/pages/Register.tsx"
import Home from "../component/home.tsx"
import DashboardSelector from "../component/dashboardSelector.tsx"
import Sdashboard from "@/modules/student/pages/Sdashboard.tsx"
import Profile from "@/modules/student/pages/profile.tsx"
import CheckResult from "@/modules/student/pages/resultChecker.tsx"

const AppRoutes = () => {
  return (<>
    <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/selector" element={<DashboardSelector/>}/>
        <Route path="Sdashboard" element={<Sdashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/checkresult" element={<CheckResult />} />

    </Routes>
  </>)
}
export default AppRoutes
