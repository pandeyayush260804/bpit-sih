import { Route, Routes } from "react-router-dom";


import Login from "../../modules/student/pages/Login.tsx";
import Register from "../../modules/student/pages/Register.tsx";
import Home from "../component/home.tsx";
import DashboardSelector from "../component/dashboardSelector.tsx";
import Sdashboard from "@/modules/student/pages/Sdashboard.tsx";
import Profile from "@/modules/student/pages/profile.tsx";
import CheckResult from "@/modules/student/pages/resultChecker.tsx";
import TLogin from "@/modules/teacher/pages/TLogin.tsx";
import TRegister from "@/modules/teacher/pages/TRegister.tsx";
import TDashboard from "@/modules/teacher/pages/Tdashboard.tsx";
import TProfile from "@/modules/teacher/pages/TProfile.tsx";
import AboutUs from "@/shared/component/AboutUs.tsx";
import AttendanceCalc from "@/modules/student/pages/AttandanceCalc.tsx";
import TAllStudents from "@/modules/teacher/pages/TAllStudents.tsx";
import SAttendance from "@/modules/attendance/pages/SAttendance.tsx";
import TAttendance from "@/modules/attendance/pages/TAttendance.tsx";
import SyllabusExplorer from "@/modules/student/pages/syllabusExplorer.tsx";
import TimetableExplorer from "@/modules/student/pages/timeTableExplorer.tsx";
import StudyBuddy from "@/modules/student/pages/StudyBuddy.tsx";
import SAnnouncement from "@/modules/announcement/pages/SAnnouncement.tsx";
import TAnnouncement from "@/modules/announcement/pages/TAnnouncement.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Student routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/selector" element={<DashboardSelector />} />
      <Route path="/Sdashboard" element={<Sdashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkresult" element={<CheckResult />} />
      <Route path="/attendance" element={<AttendanceCalc />} /> {/* ✅ Attendance Calculator route */}
      <Route path="/SExplorer" element={<SyllabusExplorer />} /> 
      <Route path="/STimeTable" element={<TimetableExplorer/>} /> 
      <Route path="/studybuddy" element={<StudyBuddy/>} /> 
      {/* Anouncement routes */}
      <Route path="/Sannouncement" element={<SAnnouncement/>} />
      <Route path="/Tannouncement" element={<TAnnouncement/>} />

      {/* Teacher routes */}
      <Route path="/tlogin" element={<TLogin />} />
      <Route path="/tregister" element={<TRegister />} />
      <Route path="/tdashboard" element={<TDashboard />} />
      <Route path="/tprofile" element={<TProfile />} />
      <Route path="/tstudents" element={<TAllStudents />} />

      {/* Common route */}
      <Route path="/about" element={<AboutUs />} /> {/* 👈 New AboutUs route */}
      {/* Attendance ROutes */}
      <Route path="/sattendance" element={<SAttendance />} />
      <Route path="/tattendance" element={<TAttendance />} />
    </Routes>
  );
};

export default AppRoutes;
