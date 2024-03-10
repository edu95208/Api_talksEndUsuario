import { Category } from "@prisma/client";
import { prisma } from "../database/prisma";
import { categoryCreate, categoryReturn } from "../interfaces/categoryInterfaces";


export class CategorySevice {
  public create = async (
    payLoad: categoryCreate,
    userId: number
  ): Promise<categoryReturn> => {
    const newCategory = await prisma.category.create({ data: { ...payLoad, userId } });
    return newCategory;
  };
  async delete(categoryId: number): Promise<void> {
    await prisma.category.delete({ where: { id: categoryId } });
  }
}
