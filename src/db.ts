import { DataStore } from "notarealdb";

export interface ICategory {
  id: string;
  name: string;
}

export interface ICompany {
  id: string;
  name: string;
  logoUrl: string;
  email: string;
  categories: ICategory[];
}

const store = new DataStore("./data");

export const companies = store.collection<ICompany>("companies");
export const categories = store.collection<ICategory>("categories");
