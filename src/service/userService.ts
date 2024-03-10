import { compare, hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import {
  loginReturn,
  userCreate,
  userReturn,
} from "../interfaces/UsersInterfaces";
import { AppError } from "../errors/AppErrors";
import { sign } from "jsonwebtoken";
import { userReturnSchema } from "../schemas/UserSchemas";

export class UserService {
  public create = async (payLoad: userCreate): Promise<userReturn> => {
    payLoad.password = await hash(payLoad.password, 10);
    const newUser = await prisma.user.create({ data: payLoad });
    return userReturnSchema.parse(newUser);
  };

  public login = async ({
    email,
    password,
  }: userCreate): Promise<loginReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (!foundUser) {
      throw new AppError("User not exists", 404);
    }

    const passIsValid = await compare(password, foundUser.password);
    if (!passIsValid) {
      throw new AppError("mail and password doesn't match", 401);
    }

    const secretKey = process.env.JWT_SECRET!;

    const token: string = sign({ }, secretKey, {
      subject: foundUser.id.toString(),
      expiresIn: "1h",
    });
    return {
      accessToken: token,
      user: userReturnSchema.parse(foundUser),
    };
  };
  
  public profile = async (userId: number): Promise<userReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { id: +userId } });
    return userReturnSchema.parse(foundUser);
  };
}
