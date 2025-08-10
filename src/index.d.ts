declare module "express" {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
      };
    }
  }
}
