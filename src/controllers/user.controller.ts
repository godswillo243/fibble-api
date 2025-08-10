import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { uploadImage } from "../lib/cloudinary";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user._id;
    const user = await UserModel.findById(userId)
      .select("-resetPasswordCode -password -emailVerificationCode")
      .populate("contacts", "name username email avatarUrl");

    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
export async function updateMe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user._id;
    const {
      username,
      name,
      avatar,
      bio,
    }: { username: string; name: string; avatar: string; bio: string } =
      req.body;

    const user = await UserModel.findById(userId)
      .select("-resetPasswordCode -password -emailVerificationCode")
      .populate("contacts", "name username email avatarUrl");
    if (!user) return res.status(404).json({ error: "User not found" });

    if (avatar) {
      const secureUrl = await uploadImage(avatar);
      user.avatarUrl = secureUrl || user.avatarUrl;
    }
    if (username && username.length < 3)
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    if (name && name.length < 3)
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });

    user.bio = bio || user.bio;
    user.name = name || user.name;
    user.username = username.toLowerCase() || user.username;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function searchForUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}
export async function getSuggestedUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function getContacts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contacts = await UserModel.findById((req as any).user._id)
      .select("contacts")
      .populate("contacts", "username email name avatarUrl");

    if (!contacts) return res.status(401).json({ error: "Unauthorized" });

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}
export async function addContact(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, username, id } = req.body;
    const user = await UserModel.findById((req as any).user._id);
    const targetUser = await UserModel.findOne({
      $or: [
        {
          email,
        },
        {
          username: username.toLowerCase(),
        },
        {
          _id: id,
        },
      ],
    });

    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (!targetUser) return res.status(404).json({ error: "User not found" });
    if (user.username === targetUser.username)
      return res
        .status(404)
        .json({ error: "Cannot add yourself to your contact" });

    await user.updateOne({
      $addToSet: {
        contacts: targetUser._id,
      },
    });

    const contacts = await UserModel.findById(user._id)
      .select("contacts")
      .populate("contacts", "username email name avatarUrl");

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}
export async function getContact(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}
export async function deleteContact(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, username, id } = req.body;
    const user = await UserModel.findById((req as any).user._id);
    const targetUser = await UserModel.findOne({
      $or: [
        {
          email,
        },
        {
          username: username.toLowerCase(),
        },
        {
          _id: id,
        },
      ],
    });

    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    await user.updateOne({
      $pull: {
        contacts: targetUser._id,
      },
    });
    const contacts = await UserModel.findById(user._id)
      .select("contacts")
      .populate("contacts", "username email name avatarUrl");

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}
export async function blockContact(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}
