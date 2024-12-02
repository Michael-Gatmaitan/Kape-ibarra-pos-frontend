import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";
import { getCookieToken } from "./lib/cookieToken";

// This middleware is for checking and validating user's token for log in, automatic login & more.

// ???: WTF COOKIES NOT FETHCING SESSION
// !!!: JUST FIND OUT THAT im setting it in cookies hehe

export async function middleware(req: NextRequest) {
  const token = await getCookieToken();

  // If there's no token, redirect to login
  console.log(token);
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const payload = await verifySession(token);

    console.log("middleware rolename: ", payload.roleName);

    // If there's no roleId in payload decrypted
    if (!payload?.roleName)
      return NextResponse.redirect(new URL("/login", req.url));

    // console.log("Payload: ", payload);

    // Validate all roles here
    const url = req.url;

    // ** CUSTOMERS ** //
    // Redirect if user logged in but navigates to login/signup
    if (url.includes("/login")) {
      return NextResponse.redirect(new URL("/", url));
    }

    if (payload.roleName === "customer") {
      if (url.includes("/view/") || url.includes("/u/")) {
        return NextResponse.redirect(new URL("/home", url));
      }
    }

    if (
      url.includes("/view/") &&
      ["Cashier", "Barista"].includes(payload.roleName)
    ) {
      console.log("hes a: ", payload.roleName);
      if (payload.roleName === "Cashier") {
        return NextResponse.redirect(new URL("/u/cashier/counter", url));
      } else if (payload.roleName === "Barista") {
        return NextResponse.redirect(new URL("/u/barista/orders", url));
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
    "/",
    "/create/((?!general).*)",
    "/update/((?!general).*)",
    "/view/((?!general).*)",
    "/u/((?!general).*)",
    "/c/((?!general).*)", // for customer
    // "/auth/((?!general).*)",
  ],
};
