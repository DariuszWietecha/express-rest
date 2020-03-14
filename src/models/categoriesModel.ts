import { categories } from "../db";

export interface ICategory {
  id: string;
  name: string;
}

export function get(id: string): ICategory | undefined {
  return categories.get(id);
}

export function list():ICategory[] {
  return categories.list();
}

export function create(Item: ICategory): ICategory {
  const campanyId = categories.create(Item);
  return categories.get(campanyId);
}

export function update(Item: ICategory): ICategory {
  categories.update(Item);
  return categories.get(Item.id);
}