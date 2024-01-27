import Student from "@/lib/models/studentModels";
import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export const POST = async (req) => {
  try {
    const MAX_AGE = 60 * 60 * 24 * 30; // days;
    const { client } = await connectToDb();

    const formData = await req.formData();

    const email = formData.get("email");
    const password = formData.get("pass");

    const list = await Student.find({
      email: email,
      password: password,
    });

    if (list.length > 0) {
      const seralized = serialize("token", list[0]._id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
      });

      const response = {
        msg: "Authenticated!",
      };

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Set-Cookie": seralized },
      });
    } else {
      return NextResponse.json({ msg: "Login Failed" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
