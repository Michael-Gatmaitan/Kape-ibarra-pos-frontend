import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "./lib/session";

// This middleware is for checking and validating user's token for log in, automatic login & more.

// ???: WTF COOKIES NOT FETHCING SESSION
// !!!: JUST FIND OUT THAT im setting it in cookies hehe

export async function middleware(req: NextRequest) {
  const token = cookies().get("token")?.value;

  // If there's no token, redirect to login
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const payload = await verifySession(token);

    // If there's no roleId in payload decrypted
    if (!payload.roleName)
      return NextResponse.redirect(new URL("/login", req.url));

    console.log("Payload: ", payload);

    // Validate all roles here
    const url = req.url;

    if (
      url.includes("/view/") &&
      ["Cashier", "Barista"].includes(payload.roleName)
    ) {
      console.log("hes a: ", payload.roleName);
      if (payload.roleName === "Cashier") {
        return NextResponse.redirect(new URL("/u/cashier/counter", req.url));
      } else if (payload.roleName === "Barista") {
        return NextResponse.redirect(new URL("/u/barista/orders", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    "/create/((?!general).*)",
    "/view/((?!general).*)",
    "/update/((?!general).*)",
  ],
};
