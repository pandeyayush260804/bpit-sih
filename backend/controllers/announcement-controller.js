import * as announcementService from "../services/announcement-service.js";

// ✅ Create announcement (no auth required)
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, createdBy } = req.body; // createdBy comes from body

    if (!title || !message || !createdBy) {
      return res
        .status(400)
        .json({ success: false, error: "Title, message, and createdBy are required" });
    }

    const announcement = await announcementService.createAnnouncement({
      title,
      message,
      createdBy,
    });

    res.status(201).json({ success: true, announcement });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    res.status(200).json({ success: true, announcements });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get teacher's announcements (email from query)
export const getTeacherAnnouncements = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required in query" });
    }

    const announcements = await announcementService.getTeacherAnnouncements(email);
    res.status(200).json({ success: true, announcements });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
