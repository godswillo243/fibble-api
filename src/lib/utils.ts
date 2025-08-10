import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../config/env";
import { RefreshTokenModel } from "../models/refreshToken.model";

export async function hashPassword(
  password: string
): Promise<{ hash: string; salt: string }> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
  return { hash: derivedKey.toString("hex"), salt };
}
export async function verifyPassword(
  password: string,
  hash: string,
  salt: string
): Promise<boolean> {
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), derivedKey);
}
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET!, {
    expiresIn: "10M",
  });
}
export function verifyToken(token: string): string | null {
  const decoded = jwt.verify(token, JWT_SECRET!);
  if (!decoded) {
    return null;
  }
  return (decoded as { userId: string }).userId;
}
export async function generateRefreshToken(userId: string): Promise<string> {
  await RefreshTokenModel.deleteMany({
    user: userId,
  });
  const token = jwt.sign({ userId }, JWT_REFRESH_SECRET!, {
    expiresIn: "2W",
  });
  await RefreshTokenModel.create({
    user: userId,
    token,
  });
  return token;
}
export async function verifyRefreshToken(
  token: string
): Promise<string | null> {
  const refreshTokenObj = await RefreshTokenModel.findOne({
    token,
  });
  if (!refreshTokenObj) {
    return null;
  }
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET!);
  if (!decoded) {
    return null;
  }
  return (decoded as { userId: string }).userId;
}
