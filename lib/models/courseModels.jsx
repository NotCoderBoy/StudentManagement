import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    course_id: { type: String, required: true, unique: true },
    course_name: { type: String, required: true },
    course_code: { type: String, required: true, unique: true },
    course_duration: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Course =
  mongoose.models.courses || mongoose.model("courses", courseSchema);

export default Course;
