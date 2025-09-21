// controllers/attendance-controller.js
import { studentModel } from "../models/student-model.js";
import { teacherModel } from "../models/teacher-model.js";

/**
 * ✅ Mark Attendance
 * - Teacher marks attendance for a student (by rollNo)
 */
export const markAttendance = async (req, res) => {
  try {
    const { rollNo, status, teacherId, subject } = req.body;

    // Verify teacher
    const teacher = await teacherModel.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Verify student
    const student = await studentModel.findOne({ rollNo });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Push attendance record
    student.attendance.push({
      subject: subject || teacher.subject,  // Use provided subject or teacher.subject
      teacher: teacher._id,
      status,
    });

    await student.save();

    res.json({
      message: "Attendance marked successfully",
      record: student.attendance[student.attendance.length - 1],
    });
  } catch (err) {
    console.error("❌ Error in markAttendance:", err);
    res.status(500).json({ message: "Error marking attendance" });
  }
};

/**
 * ✅ Get Student Attendance
 * - Fetch attendance of a student (by rollNo)
 */
export const getStudentAttendance = async (req, res) => {
  try {
    const { rollNo } = req.params;

    const student = await studentModel
      .findOne({ rollNo })
      .populate("attendance.teacher", "name subject")
      .select("attendance name class rollNo");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student.attendance);
  } catch (err) {
    console.error("❌ Error in getStudentAttendance:", err);
    res.status(500).json({ message: "Error fetching student attendance" });
  }
};

/**
 * ✅ Get Class Attendance
 * - Fetch all students + their attendance by className
 */
export const getClassAttendance = async (req, res) => {
  console.log('🚀 getClassAttendance called with className:', req.query.className);

  try {
    const { className } = req.query;

    if (!className) {
      return res.status(400).json({ message: "className query parameter is required" });
    }

    const students = await studentModel.find({ class: className });

    if (students.length === 0) {
      return res.status(404).json({ message: `No students found in class ${className}` });
    }

    res.json(students);
  } catch (err) {
    console.error("Error in getClassAttendance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

