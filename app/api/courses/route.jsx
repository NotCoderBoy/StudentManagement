import Student from "@/lib/models/studentModels";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connectToDb from "@/lib/config";

export const GET = async (req) => {
  const { client } = await connectToDb();

  const cookieStore = cookies();

  const token = cookieStore.get("token");

  const { value } = token;

  const student = await Student.findById(value).populate("courses");

  const studentCourses = student.courses;

  return NextResponse.json(
    { studentCourses },
    {
      status: 200,
    }
  );
};
