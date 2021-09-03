import express from "express";
import createHttpError from "http-errors";
import ProductModel from "../../models/Product.js";
import q2m from "query-to-mongo";
import multer from "multer";
import saveImageCloudinary from "../../tools/saveImageCloudinary.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query = q2m(req.query);
      const { total, products } = await ProductModel.findProducts(query);

      res.send({
        links: query.links("/products", total),
        total,
        products,
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
      const { productId } = req.params;

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        next(createHttpError(404, `Product with id: ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      if (deletedProduct) {
        res.send(deletedProduct);
      } else {
        next(createHttpError(404, `Product with id: ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:productId/reviews")
  .get(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await ProductModel.findById(productId);
      if (product) {
        res.send(product.reviews);
      } else {
        next(createHttpError(404, `Product with id: ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $push: { reviews: req.body },
        },
        { new: true, runValidators: true }
      );
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        next(createHttpError(404, `Product with id: ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  });

// =============== post product image =================
router.post(
  "/:productId/image",
  multer({ storage: saveImageCloudinary }).single("image"),
  async (req, res, next) => {
    try {
      const imageUrl = req.file.path;
      const { productId } = req.params;

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { imageUrl },
        { new: true }
      );
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        next(createHttpError(404, `Product with id: ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

router
  .route("/:productId/reviews/:reviewId")
  .get(async (req, res, next) => {
    try {
      const { productId, reviewId } = req.params;
      const product = await ProductModel.findById(productId);
      if (product) {
        const review = product.reviews.find(
          (r) => r._id.toString() === reviewId
        );
        if (review) {
          res.send(review);
        } else {
          next(createHttpError(404, `Review with id: ${reviewId} not found!`));
        }
      } else {
        next(createHttpError(404, `Product with id: ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { productId, reviewId } = req.params;
      const product = await ProductModel.findOneAndUpdate(
        {
          _id: productId,
          "reviews._id": reviewId,
        },
        { $set: { "reviews.$": { _id: reviewId, ...req.body } } },
        { new: true, runValidators: true }
      );
      if (product) {
        res.send(product);
      } else {
        next(createHttpError(404, `Not found!`));
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { productId, reviewId } = req.params;
      const product = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $pull: {
            reviews: { _id: reviewId },
          },
        },
        { new: true }
      );
      if (product) {
        res.send(product);
      } else {
        next(createHttpError(404, `Not found!`));
      }
    } catch (error) {
      next(error);
    }
  });

export default router;
