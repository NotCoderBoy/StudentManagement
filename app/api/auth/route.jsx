import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json(
      {
        msg: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  const response = {
    user: value,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
};
