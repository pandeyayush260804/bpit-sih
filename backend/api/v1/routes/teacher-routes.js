import express from "express";
import { login, register, profile, getAllStudents } from "../../../controllers/teacher-controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);
router.get("/students", getAllStudents);

export default router;
