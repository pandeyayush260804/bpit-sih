import { studentModel } from "../models/student-model.js";
import { teacherModel } from "../models/teacher-model.js";

// ✅ Mark Attendance
export const markAttendance = async (rollNo, teacherId, subject, status) => {
  const student = await studentModel.findOne({ rollNo }); // 🔹 find by rollNo
  if (!student) throw new Error("Student not found");

  // verify teacher exists
  const teacher = await teacherModel.findById(teacherId);
  if (!teacher) throw new Error("Teacher not found");

  // Add attendance record
  student.attendance.push({ teacher: teacherId, subject, status });
  await student.save();

  return student.attendance[student.attendance.length - 1]; // return last added record
};

// ✅ Get Student Attendance
export const getStudentAttendance = async (rollNo) => {
  const student = await studentModel.findOne({ rollNo }) // 🔹 find by rollNo
    .populate("attendance.teacher", "name subject")
    .select("attendance name class rollNo");
  if (!student) throw new Error("Student not found");
  return student.attendance;
};

// ✅ Get Class Attendance
export const getClassAttendance = async (className) => {
  const students = await studentModel.find({ class: className })
    .populate("attendance.teacher", "name subject")
    .select("name rollNo attendance");
  return students;
};

// ✅ helper: Get teacher by ID (for controller use)
export const getTeacherById = async (teacherId) => {
  return teacherModel.findById(teacherId).select("name subject");
};
