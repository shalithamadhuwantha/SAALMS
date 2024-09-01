import mongoose, { Schema, model } from "mongoose";

const LecturerSchema = new Schema(
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

const Lecturer = mongoose.models.Lecturer || model("Lecturer", LecturerSchema);

export default Lecturer;
