import express from "express";
import * as companiesController from "../controllers/companiesController";
import { DynamoDBDocumentClient } from "../db";

const router = express.Router();

// TODO: db initiated once time in index.ts
router.get('/', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.get(DynamoDBDocumentClient, req));
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.get(DynamoDBDocumentClient, req));
});

router.post('/', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.put(DynamoDBDocumentClient, req));
});

router.put('/', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.put(DynamoDBDocumentClient, req));
});

router.put('/:id/associate/:categoryId', async (req: express.Request, res: express.Response) => {
  res.send(await companiesController.associateCategory(DynamoDBDocumentClient, req));
});

export default router;