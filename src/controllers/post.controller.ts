import { NextFunction, Request, Response } from "express";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}
export async function getPostFeed(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
export async function deletePost(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
export async function getUserPosts(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
export async function likeUnlikePost(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
export async function getComments(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
export async function getComment(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
export async function addComment(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
export async function deleteComment(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
