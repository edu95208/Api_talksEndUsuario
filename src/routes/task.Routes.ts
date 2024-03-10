import { Router } from "express";
import { globalError } from "../errors/handleErros";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/taskSchema";
import { TaskController } from "../controller/taskController";
import { taskMiddlewares } from "../middlewares/taskMiddlewares";
import { userMiddleware } from "../middlewares/userMiddleware";

export const taskRouter = Router();
const controller = new TaskController();

taskRouter.use(userMiddleware.isAutehnticated);

taskRouter.post(
  "/",
  globalError.validBody(taskCreateSchema),
  taskMiddlewares.categoryIdBody,
  controller.createTask
);
taskRouter.get("/", controller.getTask);

taskRouter.use(
  "/:taskId",
  taskMiddlewares.taskExists,
  taskMiddlewares.OwnerTask
);

taskRouter.get("/:taskId", controller.retriveTask);
taskRouter.patch(
  "/:taskId",
  globalError.validBody(taskUpdateSchema),
  controller.updateTask
);
taskRouter.delete("/:taskId", controller.deleteTask);
