    // models/attendance.js
    import mongoose from "mongoose";

    const studentSchema = new mongoose.Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        registrationNumber: { type: String, required: true },
        attendance: { type: String, enum: ['🟢', '🔴'], required: true }
    });

    const attendanceSchema = new mongoose.Schema({
        lectureId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        students: [studentSchema]
    });

    export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
