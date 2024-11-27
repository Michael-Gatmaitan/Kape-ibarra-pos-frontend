"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { ICustomer, IEmployee } from "..";

export const createSession = async (token: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  // console.log(cookies)

  console.log("token set successfully");
};

export const verifySession = async (session: string) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const encodeKey = new TextEncoder().encode(SECRET_KEY);
  const {
    payload,
  }: { payload: { person: IEmployee | ICustomer; roleName: string } } =
    await jwtVerify(session, encodeKey);

  return payload;
};

export const logout = async () => {
  cookies().delete("token");
};
