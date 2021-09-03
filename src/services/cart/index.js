import express from "express";

const router = express.Router();

router.route("/:userId").get(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router
  .route("/:userId/:productId")
  .post(async (req, res, next) => {
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
