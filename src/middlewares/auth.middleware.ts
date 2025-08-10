import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/utils";
import { UserModel } from "../models/user.model";
import { RefreshTokenModel } from "../models/refreshToken.model";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const userId = verifyToken(token);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await UserModel.findById(userId);
    const refreshTokenModel = await RefreshTokenModel.findOne({ user: userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!refreshTokenModel) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    (req as unknown as { user: { _id: string } }).user = {
      _id: userId,
    };
    next();
  } catch (error) {
    next(error);
  }
}
