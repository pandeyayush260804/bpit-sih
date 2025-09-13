import mongoose, { Schema, SchemaTypes } from "mongoose";
const studentSchema = new Schema({
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: SchemaTypes.String,
    required: true,
    minLength: 6
  },
  name: {
    type: SchemaTypes.String,
    required: true,
    minLength: 3
  },
  class:{
    type: SchemaTypes.String,
    required: true,
    minLength: 5
  },
  rollNo : {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  role: {
    type: SchemaTypes.String,
    enum: ['student', 'admin','teacher'],
    default: 'student'
  },
  status: {
    type: SchemaTypes.String,
    default: 'A'
  },
  regdate: {
    type: SchemaTypes.Date,
    default: Date.now
  }
});
export const studentModel = mongoose.model('students', studentSchema);