"use server";
import { cookies } from "next/headers";

export const createSession = async (token: string) => {
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  console.log("token set successfully");
};
