import { studentModel } from "../models/student-model.js"
import { compareHash, encryptPassword } from "../utils/services/password-hash.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/services/token.js";

export const register=async (studentObject)=>{
    
    try{
        studentObject.password=encryptPassword(studentObject.password)
        const doc=await studentModel.create(studentObject);

        if(doc && doc._id){
            return "User Register Succesfully"
        }

    }catch(err){
        throw err;
    }
    
}

export const login = async (studentObject) => {
  try {
    // Find user by email
    const doc = await studentModel.findOne({ email: studentObject.email }).exec();
    if (!doc) {
      throw new Error("Invalid username or password");
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(studentObject.password, doc.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    // Success: generate JWT
    const token = generateToken(doc.email);

    return {
      message: "Welcome " + doc.name,
      email: doc.email,
      role: doc.role,
      token: token   // ✅ fixed here
    };
  } catch (err) {
    throw new Error(err.message || "Invalid user credentials");
  }
};