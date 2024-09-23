

import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    id: { type: Number, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    registrationNumber: { type: String, required: false }
  });

const classSchema = new mongoose.Schema({
  lecturerID: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  batch: { type: String, required: true },
  lessonName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ['physical', 'online'], required: true },
  link: { type: String },
  additionalLink: { type: String },
  students: [studentSchema]
});

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);

export default Class;
