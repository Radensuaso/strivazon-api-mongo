import express from "express";
import cors from "cors";
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
import mongoose from "mongoose";

const server = express();

const port = process.env.port;

server.use(cors());

server.use(express.json());
server.use("/products", productsRouter);
server.use("/users", usersRouter);
server.use("/reviews", reviewsRouter);
server.use("/cart", cartRouter);

server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(genericServerErrorHandler);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("🍃Successfully connected to mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log("🛩️ Server is running on port ", port);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("MONGO ERROR: ", err);
});
