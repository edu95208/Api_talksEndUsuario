import { Router } from "express";
import { CategoryController } from "../controller/categoryController";
import { globalError } from "../errors/handleErros";
import { categoryCreateSchema } from "../schemas/categorySchema";
import { categoryMiddlewares } from "../middlewares/categorymiddleware";
import { userMiddleware } from "../middlewares/userMiddleware";

export const categoryRoute = Router();
const controller = new CategoryController();

categoryRoute.use(userMiddleware.isAutehnticated);

categoryRoute.post(
  "/",
  globalError.validBody(categoryCreateSchema),
  controller.createCategory
);

categoryRoute.use(
  "/:categoryId",
  categoryMiddlewares.categoryExists,
  categoryMiddlewares.OwnerCategory
);

categoryRoute.delete(
  "/:categoryId",
  controller.deleteCategory
);
