import express from "express";
import * as categoriesModel from "../models/categoriesModel";
import * as companiesModel from "../models/companiesModel";

interface IViewResponse {
  categoryId?: string;
  categories: categoriesModel.ICategory[] | undefined;
  companies: companiesModel.ICompany[] | undefined;
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
