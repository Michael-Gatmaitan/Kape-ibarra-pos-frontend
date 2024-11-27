import { NextRequest } from "next/server";
import { createSession, verifySession } from "../../../lib/session";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const token = req.headers.get("token");

  if (!token) return Response.json({ error: "Invalid token" });

  console.log("setting token", token);
  await createSession(token);

  return Response.json({ message: "Token set successfully" });
}

export async function GET(req: NextRequest) {
  const token = cookies().get("token")?.value;

  // const getType = req.query.getType;
  const getType = req.nextUrl.searchParams.get("getType");

  if (getType === "payload") {
    const payload = await verifySession(token);
    if (!payload.person.id) {
      return Response.json({ error: "No user found" });
    }

    console.log(payload);
    return Response.json(payload);
  } else if (getType === "token") {
    return Response.json({ token });
  }
}
