import { Request, Response } from "express";
import { UserService } from "../service/userService";

export class UserController {
  private userService: UserService = new UserService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await this.userService.create(req.body);
    return res.status(201).json(newUser);
  };
  public login = async (req: Request, res: Response): Promise<Response> => {
    const loginUser = await this.userService.login(req.body);
    return res.status(200).json(loginUser);
  };
  public profile = async (req: Request, res: Response): Promise<Response> => {
    const profileUser = await this.userService.profile(Number(res.locals.sub));
    return res.status(200).json(profileUser);
  };
}
