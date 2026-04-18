import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { googleConfig } from "@/lib/configs";
import { connectDB } from "@/lib/db";

let authPromise: Promise<Awaited<ReturnType<typeof createAuth>>> | null = null;

async function createAuth() {
  const google = googleConfig();
  const connection = await connectDB();

  if (!connection.db) {
    throw new Error("[auth] MongoDB database connection is not available.");
  }

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: mongodbAdapter(connection.db, {
      client: connection.getClient(),
      transaction: false,
    }),
    plugins: [nextCookies()],
    socialProviders: {
      google: {
        clientId: google.clientId,
        clientSecret: google.clientSecret,
      },
    },
  });
}

export function getAuth() {
  authPromise ??= createAuth();
  return authPromise;
}
