import { z } from "zod";
import { baseSchema } from "./baseSchema";
import { categorySchema } from "./categorySchema";

export const taskSchema = baseSchema.extend({
  title: z.string().min(1),
  content: z.string().min(1),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().nullish(),
});
const taskCreateSchema = taskSchema.omit({ id: true });

const taskUpdateSchema = taskSchema
  .partial()
  .omit({ id: true, category: true });

const taskReturnSchema = taskSchema.extend({
  categoryId: z.number().positive().nullish(),
});
const taskReturnCategorySchema = taskSchema
  .extend({
    category: categorySchema.nullish(),
  })
  .omit({ categoryId: true });

export {
  taskCreateSchema,
  taskUpdateSchema,
  taskReturnSchema,
  taskReturnCategorySchema,
};
