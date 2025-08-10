import { Router } from "express";
import {
  createUser,
  getAuthUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
  sendResetPasswordEmail,
  verifyEmail,
} from "../controllers/auth.controller";
import { checkAuth } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.get("/user", checkAuth, getAuthUser);
authRouter.post("/user", createUser);
authRouter.post("/user/session", loginUser);
authRouter.delete("/user/session", checkAuth, logoutUser);
authRouter.get("/token", refreshAccessToken);

authRouter.post("/user/email", verifyEmail);

authRouter.get("/user/password/:email", sendResetPasswordEmail);
// reset password
authRouter.put("/user/password/:email", resetPassword);
// refresh access token
authRouter.get("/access_token", (req, res) => {
  res.send("Login route");
});

export { authRouter as authRoutes };
