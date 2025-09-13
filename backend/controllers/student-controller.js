import { studentModel } from "../models/student-model.js";
import { register as registerStudent , login as loginStudent} from "../services/student-service.js";

export const login=async (req,res)=>{
    const studentObject=req.body;
    try{
        const obj=await loginStudent(studentObject);
        res.status(200).json(obj);
    }catch(err){
        res.status(500).json({message:"Login Fail....."});
        console.log(err);

    }
    
}
export const register=async (req,res)=>{
    console.log("Data", req.body);
    const studentObject=req.body;
    try{
        const message= await registerStudent(studentObject);
        res.status(200).json({message:message});
    }catch(err){
        res.status(500).json({message:"Error Dusring Register....."});
        console.log(err);
    }
    

    //res.json({message:"Register"});
}
export const profile = async (req, res) => {
    const { email } = req.query;  // Getting email from query param

    try {
        const student = await studentModel.findOne({ email }).select("-password");  // Exclude password
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching profile" });
    }
};
