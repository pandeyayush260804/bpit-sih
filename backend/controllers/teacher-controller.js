import { teacherModel } from "../models/teacher-model.js";
import { register as registerTeacher, login as loginTeacher } from "../services/teacher-service.js";
import { studentModel } from "../models/student-model.js";  // 🔹 Import student model


export const login = async (req, res) => {
    const teacherObject = req.body;
    try {
        const obj = await loginTeacher(teacherObject);
        res.status(200).json(obj);
    } catch (err) {
        res.status(500).json({ message: "Login Failed..." });
        console.log(err);
    }
};

export const register = async (req, res) => {
    const teacherObject = req.body;
    try {
        const message = await registerTeacher(teacherObject);
        res.status(200).json({ message });
    } catch (err) {
        res.status(500).json({ message: "Error during Teacher Registration" });
        console.log(err);
    }
};

export const profile = async (req, res) => {
    const { email } = req.query;

    try {
        const teacher = await teacherModel.findOne({ email }).select("-password");
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        res.status(200).json(teacher);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching profile" });
    }
};
export const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find().select("-password"); // hide passwords
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Error fetching students" });
  }
};