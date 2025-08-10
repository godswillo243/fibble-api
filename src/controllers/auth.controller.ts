import { NextFunction, Request, Response } from "express";
import {
  createUserValidationSchema,
  loginValidationSchema,
} from "../lib/validationSchemas";
import { UserModel } from "../models/user.model";
import {
  generateRefreshToken,
  generateToken,
  hashPassword,
  verifyPassword,
  verifyRefreshToken,
} from "../lib/utils";
import { RefreshTokenModel } from "../models/refreshToken.model";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = createUserValidationSchema.safeParse(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }
    const { email, name, password, username } = result.data;

    const existingUser = await UserModel.findOne({
      $or: [
        {
          email,
        },
        {
          username,
        },
      ],
    });
    if (existingUser) {
      return res.status(400).json({
        error: `${
          email === existingUser.email
            ? "Email"
            : username === existingUser.username
            ? "username"
            : "  "
        } already used`,
      });
    }
    const hpassword = await hashPassword(password);
    const newUser = new UserModel({
      email,
      name,
      username: username.toLowerCase(),
      password: hpassword,
    });
    await newUser.save();

    const token = generateToken(newUser._id.toString());
    const refreshToken = await generateRefreshToken(newUser._id.toString());

    res.status(201).json({ token, refreshToken });
  } catch (error) {
    next(error);
  }
}
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = loginValidationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.issues[0].message);
    }
    const { emailOrUsername, password } = result.data;

    const user = await UserModel.findOne({
      $or: [
        {
          email: emailOrUsername,
        },
        {
          username: emailOrUsername,
        },
      ],
    });
    if (!user) {
      return res.status(400).json({ error: "Email or username is invalid" });
    }

    const isPasswordMatch = await verifyPassword(
      password,
      user.password.hash,
      user.password.salt
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(user._id as unknown as string);
    const refreshToken = await generateRefreshToken(
      user._id as unknown as string
    );

    res.status(201).json({ token, refreshToken });
  } catch (error) {
    next(error);
  }
}
export async function getAuthUser(req: Request, res: Response) {
  try {
    const userId = (req as any).user._id;
    const user = await UserModel.findById(userId).select(
      "-resetPasswordCode -password -emailVerificationCode"
    );

    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    const refreshToken = authHeader.split(" ")[1];
    if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });
    const userId = await verifyRefreshToken(refreshToken);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = generateToken(userId);
    const newRefreshToken = await generateRefreshToken(userId);

    return res.status(201).json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
}
export async function logoutUser(req: Request, res: Response) {
  try {
    const userId: string = (req as any).user._id;

    await RefreshTokenModel.deleteMany({
      user: userId,
    });
    res.status(200).json("Logged out!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function verifyEmail(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function sendResetPasswordEmail(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function resetPassword(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
