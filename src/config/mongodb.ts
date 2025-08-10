import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

export async function connectMonogDB() {
  try {
    if (!MONGODB_URI) throw new Error("Mongodb url not found");
    const connection = await mongoose.connect(MONGODB_URI);
    return connection;
  } catch (error) {
    throw error;
  }
}
