import express from "express";
import studentRoutes from "./student-routes.js"
import { auth } from "../../../utils/middlewares/auth.js";


export const indexRoute=express.Router();

indexRoute.use("/student",studentRoutes);
