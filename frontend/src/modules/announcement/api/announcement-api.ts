import axios from "axios";

const announcementAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL4, // Ends at /api/v1/announcement
});

// ✅ Create announcement (teacher)
export const createAnnouncement = (data: {
  title: string;
  message: string;
  createdBy: string;
}) => {
  return announcementAPI.post("/", data);
};

// ✅ Get all announcements (student view)
export const getAllAnnouncements = () => {
  return announcementAPI.get("/");
};

// ✅ Get announcements created by a specific teacher
export const getTeacherAnnouncements = (email: string) => {
  return announcementAPI.get(`/teacher?email=${email}`);
};
