import * as express from "express";
import * as companies from "../api/companies";
import db from "../db";

const router = express.Router();

// TODO: get by id
router.get('/', async (req: companies.ICompanyRequest, res: express.Response) => {
  res.send(await companies.get(db, req));
});

router.post('/', async (req: companies.ICompanyRequest, res: express.Response) => {
  res.send(await companies.put(db, req));
});

router.put('/', async (req: companies.ICompanyRequest, res: express.Response) => {
  res.send(await companies.put(db, req));
});

export default router;