import express from "express";
import studentRoutes from "./student-routes.js"
import teacherRoutes from "./teacher-routes.js"; 
import { auth } from "../../../utils/middlewares/auth.js";
import  attendanceRoutes from "./attendance-routes.js"
import announcementRoutes from "./announcement-routes.js";


export const indexRoute=express.Router();

indexRoute.use("/student",studentRoutes);
indexRoute.use("/teacher",teacherRoutes);
indexRoute.use("/attendance",attendanceRoutes);
indexRoute.use("/announcements", announcementRoutes);