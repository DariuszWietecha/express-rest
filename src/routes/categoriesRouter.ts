import express from "express";
import * as categoriesController from "../controllers/categoriesController";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.get(req));
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.get(req));
});

router.post('/', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.put(req));
});

router.put('/', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.put(req));
});

export default router;