import { Router } from "express";
import {
  addContact,
  blockContact,
  deleteContact,
  getContact,
  getContacts,
  getMe,
  updateMe,
} from "../controllers/user.controller";
import { checkAuth } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.use(checkAuth);

userRouter.get("/me", getMe);
userRouter.put("/me", updateMe);

//? Routes concerning contacts
userRouter.get("/contacts/:id", getContact);
userRouter.get("/contacts/", getContacts);
userRouter.post("/contacts", addContact);
userRouter.delete("/contacts", deleteContact);
// userRouter.patch("/contacts/:id", blockContact);

//?

export { userRouter as userRoutes };
