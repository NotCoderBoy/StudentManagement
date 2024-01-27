import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.students || mongoose.model("students", studentSchema);

export default Student;
