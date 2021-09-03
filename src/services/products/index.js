import express from "express";
import createHttpError from "http-errors";
import ProductModel from "../../models/Product.js";
import q2m from "query-to-mongo";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query = q2m(req.query);
      const { total, blogPosts: products } = await ProductModel.findProducts(
        query
      );

      res.send({
        links: query.links("/products", total),
        total,
        blogPosts: products,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newProduct = new ProductModel(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).send(savedProduct);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:productId")
  .get(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await ProductModel.findById(productId);
      if (product) {
        res.send(product);
      } else {
        next(createHttpError(404, `Product with id: ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:productId/reviews")
  .get(async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:productId/reviews/:reviewId")
  .put(async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  });

export default router;
