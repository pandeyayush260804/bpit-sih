import mongoose from "mongoose";
export const createConnection=()=>{
    return mongoose.connect(process.env.DB_URL,{
        maxPoolSize: 7

    });

}
export const createTeacherConnection = () => {
    return mongoose.createConnection(process.env.DB_URL2, {
        maxPoolSize: 7
    });
};