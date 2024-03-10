import { z } from "zod";
import {
  categoryCreateSchema,
  categoryReturnSchema,
} from "../schemas/categorySchema";

type categoryCreate = z.infer<typeof categoryCreateSchema>;
type categoryReturn = z.infer<typeof categoryReturnSchema>;

export { categoryCreate, categoryReturn };
