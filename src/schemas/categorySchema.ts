import { z } from "zod";
import { baseSchema } from "./baseSchema";

export const categorySchema = baseSchema.extend({
  name: z.string().min(1),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
export const categoryReturnSchema = categorySchema;
