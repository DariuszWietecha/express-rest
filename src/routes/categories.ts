import * as express from "express";
import * as categories from "../api/categories";
import db from "../db";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  res.send(await categories.get(db, req));
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  res.send(await categories.get(db, req));
});

router.post('/', async (req: express.Request, res: express.Response) => {
  res.send(await categories.put(db, req));
});

router.put('/', async (req: express.Request, res: express.Response) => {
  res.send(await categories.put(db, req));
});

export default router;