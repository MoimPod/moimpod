"use server";

import { cookies } from "next/headers";

export const getServerToken = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  return Promise.resolve(token);
};
