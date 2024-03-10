import { Request, Response } from "express";
import { CategorySevice } from "../service/categoryService";

export class CategoryController {
  private categoryService: CategorySevice = new CategorySevice();
  public createCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = Number(res.locals.sub)
    const newcategory = await this.categoryService.create(req.body, userId);
    return res.status(201).json(newcategory);
  };
  public deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    await this.categoryService.delete(Number(req.params.categoryId));
    return res.status(204).json();
  };
}
