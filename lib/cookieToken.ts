import { cookies } from "next/headers";

export const getCookieToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return token;
};
