import express, { json } from "express";
import "express-async-errors";
import helmet from "helmet";
import { taskRouter } from "./routes/task.Routes";
import { globalError } from "./errors/handleErros";
import { categoryRoute } from "./routes/category.Routes";
import { userRouter } from "./routes/user.Routes";

export const app = express();
app.use(helmet());
app.use(json());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRoute);
app.use("/users", userRouter);
app.use(globalError.handleErros);
