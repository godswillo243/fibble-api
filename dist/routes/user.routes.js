"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
exports.userRoutes = userRouter;
userRouter.use(auth_middleware_1.checkAuth);
userRouter.get("/me", user_controller_1.getMe);
userRouter.put("/me", user_controller_1.updateMe);
//? Routes concerning contacts
userRouter.get("/contacts/:id", user_controller_1.getContact);
userRouter.get("/contacts/", user_controller_1.getContacts);
userRouter.post("/contacts", user_controller_1.addContact);
userRouter.delete("/contacts", user_controller_1.deleteContact);
