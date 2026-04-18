import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "@/lib/auth/auth";

const handler = async (request: Request) => {
  const auth = await getAuth();

  if (!auth) {
    throw new Error("[auth] Better Auth instance could not be created.");
  }

  return auth.handler(request);
};

export const { GET, POST, PATCH, PUT, DELETE } = toNextJsHandler(handler);
