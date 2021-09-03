import express from "express";

const router = express.Router();

router
  .route("/")
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
  .route("/:id")
  .get(async (req, res, next) => {
    try {
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

export default router;
