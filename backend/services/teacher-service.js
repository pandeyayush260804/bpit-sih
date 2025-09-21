import { teacherModel } from "../models/teacher-model.js";
import { compareHash, encryptPassword } from "../utils/services/password-hash.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/services/token.js";

export const register = async (teacherObject) => {
    try {
        teacherObject.password = encryptPassword(teacherObject.password);
        const doc = await teacherModel.create(teacherObject);

        if (doc && doc._id) {
            return "Teacher registered successfully";
        }
    } catch (err) {
        throw err;
    }
};

export const login = async (teacherObject) => {
    try {
        console.log("Login attempt:", teacherObject);

        const doc = await teacherModel.findOne({ email: teacherObject.email }).exec();
        console.log("Found teacher document:", doc);

        if (!doc) throw new Error("Invalid username or password");

        const isMatch = await bcrypt.compare(teacherObject.password, doc.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) throw new Error("Invalid username or password");

        const token = generateToken(doc.email);

        return {
            message: "Welcome " + doc.name,
            email: doc.email,
            role: doc.role,
            token: token
        };
    } catch (err) {
        console.error("Teacher login error:", err.message);
        throw new Error(err.message || "Invalid teacher credentials");
    }
};
