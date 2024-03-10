import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "../schemas/UserSchemas";

type userCreate = z.infer<typeof userCreateSchema>;
type userReturn = z.infer<typeof userReturnSchema>;

type loginReturn= {
    accessToken: string; 
    user: userReturn;
}

export { userCreate, userReturn ,loginReturn };
