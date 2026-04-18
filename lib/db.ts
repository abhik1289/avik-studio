import mongoose from "mongoose";
import { serverConfig } from "./configs";
// import { serverConfig } from "./configs/server.config";

declare global {
  var mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}


export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  globalThis.mongooseConnectionPromise = mongoose.connect(serverConfig.dbUrl);

  const connection = await globalThis.mongooseConnectionPromise;

  return connection.connection;
}
