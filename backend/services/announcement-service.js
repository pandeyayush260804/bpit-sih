import { Announcement } from "../models/announcement-model.js";

// Create a new announcement
export const createAnnouncement = async (data) => {
  const announcement = new Announcement(data);
  return await announcement.save();
};

// Get all announcements
export const getAllAnnouncements = async () => {
  return await Announcement.find().sort({ createdAt: -1 });
};

// Get announcements by teacher
export const getTeacherAnnouncements = async (teacherEmail) => {
  return await Announcement.find({ createdBy: teacherEmail }).sort({ createdAt: -1 });
};
