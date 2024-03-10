import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { AppError } from "./AppErrors";
import { JsonWebTokenError } from "jsonwebtoken";

class GlobalError {
  public handleErros = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: error.message });
    }

    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  };

  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };
}

export const globalError = new GlobalError();
