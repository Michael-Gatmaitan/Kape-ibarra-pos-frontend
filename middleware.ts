import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This middleware is for checking and validating user's token
// for log in, automatic login & more.
// ???: WTF COOKIES NOT FETHCING SESSION
// !!!: JUST FIND OUT THAT im setting it in cookies hehe
// * Set this to localstorage or find a way to get the cookie in either server-side or client-side
export async function middleware() {
  //
  const session = cookies().get("session")?.value;

  if (!session) {
    console.log("no session");
  } else {
    console.log("session");
  }

  NextResponse.next();
}
