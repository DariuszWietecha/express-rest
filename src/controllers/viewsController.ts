import express from "express";
import * as categoriesModel from "../models/categoriesModel";
import * as companiesModel from "../models/companiesModel";
import * as db from "../db";

interface IViewResponse {
  categoryId?: string;
  categories: db.ICategory[] | undefined;
  companies: db.ICompany[] | undefined;
}

export function get(req: express.Request): IViewResponse {
  const categories = categoriesModel.list();
  const companies = companiesModel.list( req.query.categoryId);

  return {
    categoryId: req.query.categoryId,
    categories,
    companies,
  }
}
