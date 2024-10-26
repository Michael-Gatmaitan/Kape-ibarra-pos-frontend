import { NextRequest } from "next/server";
import { createSession } from "../../../lib/session";

export async function POST(req: NextRequest) {
  const token = req.headers.get("token");

  if (!token) return Response.json({ error: "Invalid token" });

  console.log("setting token");
  await createSession(token);

  return Response.json({ message: "Token set successfully" });
}
