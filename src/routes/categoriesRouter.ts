import express from "express";
import * as categoriesController from "../controllers/categoriesController";
import { DynamoDBDocumentClient } from "../db";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.get(DynamoDBDocumentClient, req));
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.get(DynamoDBDocumentClient, req));
});

router.post('/', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.put(DynamoDBDocumentClient, req));
});

router.put('/', async (req: express.Request, res: express.Response) => {
  res.send(await categoriesController.put(DynamoDBDocumentClient, req));
});

export default router;