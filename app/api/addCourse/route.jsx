import Course from "@/lib/models/courseModels";
import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { client } = await connectToDb();

    // const formData = await req.formData();

    // const first = formData.get("first");
    // const last = formData.get("last");
    // const email = formData.get("email");
    // const password = formData.get("pass");

    const newItem = new Course({
      course_id: "SUB1", // or use any other method to generate a unique ID
      course_name: "English",
      course_code: "ENG",
      course_duration: "3 months",
    });

    await newItem.save();

    return NextResponse.json(
      { msg: "User Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
