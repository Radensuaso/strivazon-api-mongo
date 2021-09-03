import express from "express";
import UserModel from "../../models/User.js"
import createError from 'http-errors'
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
    const users=await UserModel.find({})
    res.send(users)
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user=new UserModel(req.body)
      const {_id}=await user.save()
      res.status(201).send({_id})
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const user=await UserModel.findById(req.params.id)
      if(user){
        res.send(user)
      }
      else{
        next(createError(404, `User with id ${req.params.id} not found!`))
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const modifiedUser=await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if(modifiedUser){
        res.send(modifiedUser)
      }
      else{
        next(createError(404,`User with id ${req.params.id}not found`))
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedUser=await UserModel.findByIdAndDelete(req.params.id,)
      if(deletedUser){
        res.status(204).send(`user with id ${req.params.id} deleted succesfully`)
      }
      else{
        next(createError(404, `user with id ${req.params.id} not found!`))
      }
    } catch (error) {
      next(error);
    }
  });

export default router;
