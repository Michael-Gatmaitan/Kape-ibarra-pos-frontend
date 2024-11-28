import { NextResponse } from "next/server";
import { batchSchema } from "../../../../lib/types";

export async function POST(req: Request) {
  const body = await req.json();
  const result = batchSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
