import { z } from "zod";
import { baseSchema } from "./baseSchema";

const userSchema = baseSchema.extend({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1)
});

const userCreateSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});
const userloginSchema = userSchema.pick({
  email: true,
  password: true,
});


const userReturnSchema = userSchema.omit({password:true});

export { userSchema, userCreateSchema, userReturnSchema, userloginSchema };
