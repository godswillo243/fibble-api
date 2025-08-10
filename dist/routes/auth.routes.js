"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRouter = (0, express_1.Router)();
exports.authRoutes = authRouter;
authRouter.get("/user", auth_middleware_1.checkAuth, auth_controller_1.getAuthUser);
authRouter.post("/user", auth_controller_1.createUser);
authRouter.post("/user/session", auth_controller_1.loginUser);
authRouter.delete("/user/session", auth_middleware_1.checkAuth, auth_controller_1.logoutUser);
authRouter.get("/token", auth_controller_1.refreshAccessToken);
authRouter.post("/user/email", auth_controller_1.verifyEmail);
authRouter.get("/user/password/:email", auth_controller_1.sendResetPasswordEmail);
// reset password
authRouter.put("/user/password/:email", auth_controller_1.resetPassword);
// refresh access token
authRouter.get("/access_token", (req, res) => {
    res.send("Login route");
});
