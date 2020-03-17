import * as db from "../db";

export function get(id: string): db.ICompany | undefined {
  return db.companies.get(id);
}

export function list(categoryId?: string): db.ICompany[] | undefined {
  if (categoryId) {
    return db.companies.list().filter((item) => Array.isArray(item.categories) &&
                                                item.categories.find((category) => category.id === categoryId));
  }
  return db.companies.list();
}

export function create(Item: db.ICompany): db.ICompany {
  const campanyId = db.companies.create(Item);
  return db.companies.get(campanyId);
}

export function update(Item: db.ICompany): db.ICompany {
  db.companies.update(Item);
  return db.companies.get(Item.id);
}
