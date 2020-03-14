import express from "express";
import * as companiesController from "../controllers/companiesController";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.get(req));
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.get(req));
});

router.post('/', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.put(req));
});

router.put('/', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.put(req));
});

router.put('/:id/associate/:categoryId', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.associateCategory(req));
});

export default router;