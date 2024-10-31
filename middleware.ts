import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// This middleware is for checking and validating user's token for log in, automatic login & more.

// ???: WTF COOKIES NOT FETHCING SESSION
// !!!: JUST FIND OUT THAT im setting it in cookies hehe

export async function middleware(req: NextRequest) {
  const SECRET_KEY = process.env.SECRET_KEY;
  const encodeKey = new TextEncoder().encode(SECRET_KEY);

  const session = cookies().get("session")?.value;

  // If there's no token, redirect to login
  if (!session) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const { payload }: { payload: { id: number; roleName: string } } =
      await jwtVerify(session, encodeKey);

    // If there's no roleId in payload decrypted
    if (!payload.roleName)
      return NextResponse.redirect(new URL("/login", req.url));

    console.log("Payload: ", payload);

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/profile"],
};
