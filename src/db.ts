import { DataStore } from "notarealdb";
import * as companiesModel from "./models/companiesModel";
import * as categoriesModel from "./models/categoriesModel";

const store = new DataStore("./data");

export const companies = store.collection<companiesModel.ICompany>("companies");
export const categories = store.collection<categoriesModel.ICategory>("categories");
