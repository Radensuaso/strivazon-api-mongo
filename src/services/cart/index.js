import express from "express";
import mongoose from 'mongoose'
import cartSchema from '../../models/Cart.js'
import userSchema from '../../models/User.js'
import productSchema from '../../models/Product.js'
import createError from 'http-errors'

const router = express.Router();

router.route("/:userId").get(async (req, res, next) => {
  try {
    const cart = await cartSchema.find({ user_id: req.params.userId })
    console.log("CART:", cart)
    
    if (cart.length === 0) {
      const newCart = await new cartSchema({
        user_id: req.params.userId,
        quantity: 0,
      })
      
      newCart.save()
      console.log("newCart Saved!")
      res.send(newCart)
      
    } else {
      res.send(cart)
    }
  } catch (err) {
    next(err)
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.params.userId)
    console.log("USER:", user)
    
    if (user) {
      
      const verifyCart = await cartSchema.find({user_id: req.params.userId})
      console.log("CART EXISTS?:", verifyCart)
      
      if (verifyCart.length === 0 || verifyCart === null) {
        console.log("DOESNT HAVE A CART")
        const createCart = await new cartSchema({
          user_id: req.params.userId,
          quantity: 0
        })
        createCart.save()
      }
      
      const product = await productSchema.findById(req.body.product_id)
      const { name, brand, price, imageUrl } = product
      console.log("PRODUCT:", product)
      
      const cart = await cartSchema.findOneAndUpdate({ user_id: user._id },
        {
          $push: { products: {
            product_id: product._id,
            name,
            brand, 
            price,
            imageUrl,
            quantity: req.body.quantity
          }}
        },
        { 
          new: true
        }
      )
      cart.save()
      console.log("Cart saved!✅")
      res.send(cart)
      
    } else {
      next(createError(400, "User does not exist."))
    }
    
  } catch (err) {
    next(err)
  }
})

router
  .route("/:userId/:productId")
  .post(async (req, res, next) => {
    try {
      const user = await userSchema.find()
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
