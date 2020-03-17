import * as db from "../db";

export function get(id: string): db.ICategory | undefined {
  return db.categories.get(id);
}

export function list():db.ICategory[] {
  return db.categories.list();
}

export function create(Item: db.ICategory): db.ICategory {
  const campanyId = db.categories.create(Item);
  return db.categories.get(campanyId);
}

export function update(Item: db.ICategory): db.ICategory {
  db.categories.update(Item);
  return db.categories.get(Item.id);
}