import express from "express";
import { syncSequelize } from "./db/index.js";
import cors from "cors";
import categoriesRouter from "./services/categories/index.js";
import productsRouter from "./services/products/index.js";
import usersRouter from "./services/users/index.js";
import reviewsRouter from "./services/reviews/index.js";
import cartRouter from "./services/cart/index.js";
import {
  notFoundHandler,
  badRequestHandler,
  forbiddenHandler,
  genericServerErrorHandler,
} from "./errorHandlers.js";
import listEndpoints from "express-list-endpoints";

const app = express();

const { PORT } = process.env;

app.use(cors());

app.use(express.json());
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/cart", cartRouter);

app.use(notFoundHandler);
app.use(badRequestHandler);
app.use(forbiddenHandler);
app.use(genericServerErrorHandler);

console.table(listEndpoints(app));

app.listen(PORT, async () => {
  try {
    await syncSequelize();
    console.log("🛩️ Server is running on port", PORT);
  } catch (error) {
    console.log(error);
  }
});
