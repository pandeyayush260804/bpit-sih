import express from "express";
import * as attendanceController from "../../../controllers/attendance-controller.js";

const router = express.Router();

// Teacher marks attendance (public now)
router.post("/mark", attendanceController.markAttendance);

// Get student attendance by rollNo (public now)
router.get("/student/:rollNo", attendanceController.getStudentAttendance);

// Get class attendance by className (public now)
router.get("/teacher/class", attendanceController.getClassAttendance);

export default router;
