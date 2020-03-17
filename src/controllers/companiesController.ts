import express from "express";
import * as companiesModel from "../models/companiesModel";
import * as categoriesModel from "../models/categoriesModel";
import * as db from "../db";
import { v1 as uuidv1 } from "uuid";

export function get(req: express.Request): db.ICompany | db.ICompany[] | undefined {
  if (req.params.hasOwnProperty("id")) {
    return companiesModel.get(req.params.id);
  }

  return companiesModel.list(req.query.categoryId)
}

export function put(req: express.Request): db.ICompany {
  const Item = { ...req.body }
  if (!Item.hasOwnProperty("id")) {
    Item.id = uuidv1();
    return companiesModel.create(Item);
  }
  return companiesModel.update(Item);
}

export function associateCategory(req: express.Request): db.ICompany {
  const companyId = req.params.id;
  const categoryId = req.params.categoryId;

  const company = companiesModel.get(companyId);
  if (!company) {
    throw new Error("Company related to companyId not available.")
  }

  const category = categoriesModel.get(categoryId);
  if (!category) {
    throw new Error("Category related to categoryId not available.")
  }

  const categories = typeof company.categories === "undefined" ?
    [category] :
    [...company.categories, category];

  const updatedCompany = {
    ...company,
    categories,
  }

  return companiesModel.update(updatedCompany);
}