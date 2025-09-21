import mongoose, { Schema, SchemaTypes } from "mongoose";

// ✅ Attendance sub-schema
const attendanceSchema = new Schema({
  date: { type: Date, default: Date.now },
  subject: { type: String, required: true },
  teacher: { type: SchemaTypes.ObjectId, ref: "teachers", required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
});

const studentSchema = new Schema({
  email: { type: SchemaTypes.String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: SchemaTypes.String, required: true, minLength: 6 },
  name: { type: SchemaTypes.String, required: true, minLength: 3 },
  class: { type: SchemaTypes.String, required: true, enum: ["CSE-A", "CSE-B", "CSE-C"] },
  rollNo: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  role: { type: SchemaTypes.String, enum: ["student", "admin", "teacher"], default: "student" },
  status: { type: SchemaTypes.String, default: "A" },
  regdate: { type: SchemaTypes.Date, default: Date.now },

  // ✅ Embed attendance
  attendance: [attendanceSchema],
});

export const studentModel = mongoose.model("students", studentSchema);
