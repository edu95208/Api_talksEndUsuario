import { prisma } from "../database/prisma";
import {
  taskCreate,
  taskReturn,
  taskReturnCategory,
  taskUpdate,
} from "../interfaces/taskInterface";
import {
  taskReturnCategorySchema,
  taskReturnSchema,
  taskSchema,
} from "../schemas/taskSchema";
import { AppError } from "../errors/AppErrors";
import { Task } from "@prisma/client";

export class TaskService {
  public create = async (
    payLoad: taskCreate,
    userId: number
  ): Promise<taskReturn> => {
    const newTask = await prisma.task.create({ data: { ...payLoad, userId } });

    return taskSchema.parse(newTask);
  };

  public get = async (
    userId: number,
    category?: string
  ): Promise<Array<taskReturnCategory>> => {
    let prismaQuery: any = { include: { category: true }, where: { userId } };

    if (category) {
      const whereClause = { name: { equals: category, mode: "insensitive" } };
      prismaQuery = { ...prismaQuery, where: { category: whereClause } };
    }
    const allsTask = await prisma.task.findMany(prismaQuery);

    if (!allsTask.length) {
      throw new AppError("Category not  found", 404);
    }
    return taskReturnCategorySchema.array().parse(allsTask);
  };

  async retrive(taskFind: Task): Promise<taskReturnCategory> {
    return taskReturnCategorySchema.parse(taskFind);
  }

  async update(taskId: string, updatedData: taskUpdate): Promise<taskReturn> {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data: updatedData,
    });
    return taskReturnSchema.parse(task);
  }

  async delete(taskId: string): Promise<void> {
    await prisma.task.delete({ where: { id: Number(taskId) } });
  }
}
