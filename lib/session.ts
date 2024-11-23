"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { IEmployee } from "..";

export const createSession = async (token: string) => {
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: 3600000 * 24 * 14,
  });

  console.log("token set successfully");
};

export const verifySession = async (session: string) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const encodeKey = new TextEncoder().encode(SECRET_KEY);
  const { payload }: { payload: { employee: IEmployee; roleName: string } } =
    await jwtVerify(session, encodeKey);

  return payload;
};

export const logout = async () => {
  cookies().delete("token");
};
