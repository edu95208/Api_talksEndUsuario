import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppErrors";
import { prisma } from "../database/prisma";
import { JwtPayload, verify } from "jsonwebtoken";

export class UserMiddlewares {
  public emailIsUnique = async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;
    if (!email) return next();

    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (foundUser) {
      throw new AppError("This email is already registered.", 409);
    }

    return next();
  };

  public isAutehnticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError("Token is required", 401);
    const [_, token] = authorization.split(" ");
     
    if(!token) throw new AppError("Token is required", 401);
  
    const {sub} = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    res.locals = { ...res.locals, sub };

    return next();
  };
}

export const userMiddleware = new UserMiddlewares();
