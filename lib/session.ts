"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { IUser } from "..";

export const createSession = async (token: string) => {
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  console.log("token set successfully");
};

export const verifySession = async (session: string) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const encodeKey = new TextEncoder().encode(SECRET_KEY);
  const { payload }: { payload: { user: IUser; roleName: string } } =
    await jwtVerify(session, encodeKey);

  return payload;
};
