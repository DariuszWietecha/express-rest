import express from "express";
import categoriesRouter from "./routes/categoriesRouter";
import companiesRouter from "./routes/companiesRouter";
import viewsRouter from "./routes/viewsRouter";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/categories", categoriesRouter);
app.use("/companies", companiesRouter);
app.use("/views", viewsRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`API listening on port ${port}!`));
