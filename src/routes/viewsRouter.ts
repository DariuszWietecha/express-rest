import express from "express";
import * as viewsController from "../controllers/viewsController";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  res.send(await viewsController.get(req));
});

export default router;