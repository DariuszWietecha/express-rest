import { companies } from "../db";

export interface ICompany {
  id: string;
  name: string;
  logoUrl: string;
  email: string;
  categories: string[];
}

export function get(id: string): ICompany | undefined {
  return companies.get(id);
}

export function list(categoryId?: string): ICompany[] | undefined {
  if (categoryId) {
    return companies.list().filter((item) => Array.isArray(item.categories) && item.categories.indexOf(categoryId) !== -1);
  }
  return companies.list();
}

export function create(Item: ICompany): ICompany {
  const campanyId = companies.create(Item);
  return companies.get(campanyId);
}

export function update(Item: ICompany): ICompany {
  companies.update(Item);
  return companies.get(Item.id);
}
