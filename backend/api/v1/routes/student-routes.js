import express from "express";
import { login, profile, register } from "../../../controllers/student-controller.js";
const router=express.Router();
router.post("/login", login)
router.post("/register", register)
router.get("/profile",profile)

export default router;