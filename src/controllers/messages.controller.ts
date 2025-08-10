import { NextFunction, Request, Response } from "express";

export async function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function deleteMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function editMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
