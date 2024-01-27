import Student from "@/lib/models/studentModels";
import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { client } = await connectToDb();

    const formData = await req.formData();

    const first = formData.get("first");
    const last = formData.get("last");
    const email = formData.get("email");
    const password = formData.get("pass");

    const newItem = new Student({
      first,
      last,
      email,
      password,
      courses: [],
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
