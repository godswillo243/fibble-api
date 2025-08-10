import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { TokenExpiredError } from "jsonwebtoken";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(error);
    if (error.name === TokenExpiredError.name) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(500).json({ error: "Opps! Something went wrong" });
  } catch (error) {
    res.status(500).json({ error: "Opps! Something went wrong" });
  }
}
