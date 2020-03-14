import express from "express";
import * as categoriesModel from "../models/categoriesModel";
import { v1 as uuidv1 } from "uuid";

export function get(req: express.Request): categoriesModel.ICategory | categoriesModel.ICategory[] | undefined {
  if (req.params.hasOwnProperty("id")) {
    return categoriesModel.get(req.params.id);
  }
  return categoriesModel.list()
}

export function put(req: express.Request): categoriesModel.ICategory {
  const Item = { ...req.body }
  if (!Item.hasOwnProperty("id")) {
    Item.id = uuidv1();
    return categoriesModel.create(Item);
  }
  return categoriesModel.update(Item);
}