import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  getTeacherAnnouncements,
} from "../../../controllers/announcement-controller.js";

const announcementRoutes = express.Router();

// Create announcement (no auth, anyone can post)
announcementRoutes.post("/", createAnnouncement);

// Get all announcements
announcementRoutes.get("/", getAllAnnouncements);

// Get announcements by creator (pass email as query param instead of token)
announcementRoutes.get("/my", getTeacherAnnouncements);

export default announcementRoutes;
