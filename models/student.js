import mongoose, { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.models.Student || model("Student", studentSchema);

export default Student;
