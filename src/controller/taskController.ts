import { Request, Response } from "express";
import { TaskService } from "../service/taskService";

export class TaskController {
  private taskService: TaskService = new TaskService();

  public createTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = Number(res.locals.sub);
    const newTask = await this.taskService.create(req.body, userId);
    return res.status(201).json(newTask);
  };

  public getTask = async (
    { query }: Request,
    res: Response
  ): Promise<Response> => {
    const userId = Number(res.locals.sub);
    const category = query.category ? String(query.category) : undefined;
    const allsTask = await this.taskService.get(userId, category);
    return res.status(200).json(allsTask);
  };
  public retriveTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { foundTask } = res.locals;
    const task = await this.taskService.retrive(foundTask);
    return res.status(200).json(task);
  };
  public updateTask = async (req: Request, res: Response) => {
    const updatedTask = await this.taskService.update(
      req.params.taskId,
      req.body
    );
    return res.status(200).json(updatedTask);
  };

  public deleteTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    await this.taskService.delete(req.params.taskId);
    return res.status(204).json();
  };
}
