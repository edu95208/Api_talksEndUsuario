import { Router } from "express";
import { UserController } from "../controller/userController";
import { globalError } from "../errors/handleErros";
import { userCreateSchema, userloginSchema } from "../schemas/UserSchemas";
import { userMiddleware } from "../middlewares/userMiddleware";

export const userRouter = Router();
const controller = new UserController();

userRouter.post(
  "/",
  globalError.validBody(userCreateSchema),
  userMiddleware.emailIsUnique,
  controller.create
);
userRouter.post(
  "/login",
  globalError.validBody(userloginSchema),
  controller.login
);
userRouter.get(
  "/profile", 
  userMiddleware.isAutehnticated, 
  controller.profile);
