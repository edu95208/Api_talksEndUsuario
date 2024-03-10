import { z } from "zod";
import {
  taskCreateSchema,
  taskReturnCategorySchema,
  taskSchema,
  taskUpdateSchema,
} from "../schemas/taskSchema";

type taskCreate = z.infer<typeof taskCreateSchema>;
type taskUpdate = z.infer<typeof taskUpdateSchema>;
type taskReturn = z.infer<typeof taskSchema>;
type taskReturnCategory = z.infer<typeof taskReturnCategorySchema>;

export { taskCreate, taskUpdate, taskReturn, taskReturnCategory };
