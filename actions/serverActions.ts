"use server";

import { cookies } from "next/headers";
import { verifySession } from "../lib/session";
// import { IUser } from "..";

// () => Promise<
//   { user: IUser; roleName: string } | { error?: string }
// >
export const getUserPayloadServer = async () => {
  const token = cookies().get("token")?.value;

  console.log("token");
  if (!token) {
    console.log("no token found");
    // return { error: "no token found" };
    return;
  }

  try {
    const payload = await verifySession(token);

    // If there's no roleId in payload decrypted
    if (!payload.roleName) {
      console.log("no user foound");
      // return { error: "no user" };
      return;
    }

    console.log("Payload: ", payload);
    return payload;

    // return NextResponse.next();
  } catch (error) {
    console.log(error);
    return;
  }
};
