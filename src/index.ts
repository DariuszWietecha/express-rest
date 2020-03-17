import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categoriesRouter";
import companiesRouter from "./routes/companiesRouter";
import viewsRouter from "./routes/viewsRouter";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/categories", categoriesRouter);
app.use("/companies", companiesRouter);
app.use("/views", viewsRouter);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`API is running on http://localhost:${port}`));
