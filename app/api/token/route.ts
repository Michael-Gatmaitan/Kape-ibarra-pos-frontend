import { NextRequest } from "next/server";
import { createSession, verifySession } from "../../../lib/session";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const token = req.headers.get("token");

  if (!token) return Response.json({ error: "Invalid token" });

  console.log("setting token");
  await createSession(token);

  return Response.json({ message: "Token set successfully" });
}

export async function GET() {
  const token = cookies().get("token")?.value;
  const payload = await verifySession(token);

  if (!payload.user.id) {
    return Response.json({ error: "No user found" });
  }

  console.log(payload);

  return Response.json(payload);
}
