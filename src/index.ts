import * as express from "express";
import categoriesRouter from "./routes/categories";
import companiesRouter from "./routes/companies";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/categories", categoriesRouter);
app.use("/companies", companiesRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
