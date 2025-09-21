import mongoose, { Schema, SchemaTypes } from "mongoose";

const teacherSchema = new Schema({
  email: { type: SchemaTypes.String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: SchemaTypes.String, required: true, minLength: 6 },
  name: { type: SchemaTypes.String, required: true, minLength: 3 },
  department: { type: SchemaTypes.String, required: true },
  subject: { type: String, required: true }, // ✅ only 1 subject
  role: { type: SchemaTypes.String, enum: ["student", "admin", "teacher"], default: "teacher" },
  status: { type: SchemaTypes.String, default: "A" },
  regdate: { type: SchemaTypes.Date, default: Date.now },
});

export const teacherModel = mongoose.model("teachers", teacherSchema);
