import express from "express";
import * as viewsController from "../controllers/viewsController";
import { DynamoDBDocumentClient } from "../db";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  res.send(await viewsController.get(DynamoDBDocumentClient, req));
});

export default router;