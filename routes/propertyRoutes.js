import express from "express";
import expressAsyncHandler from "express-async-handler";
import Property from "../models/propertyModel.js";
import { isAuth } from "../utils.js";

const propertyRouter = express.Router();

propertyRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const property = await Property.find({ owner: req.user._id });
    res.send(property);
  })
);

propertyRouter.get(
  "/mine/:slug",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const property = await Property.find({
      owner: req.user._id,
      category: req.params.slug,
    });

    res.send(property);
  })
);

propertyRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const tagExists = await Property.findOne({
      owner: req.user._id,
      tag: req.params.slug,
    });

    if (tagExists) {
      res.status(400).send({
        message:
          "Property with this tag already exists please just Edit the Old One!",
      });
    } else {
      const totalValue =
        parseFloat(req.body.valuePerShare) *
        parseFloat(req.body.totalShareAmount);
      const newProperty = new Property({
        tag: req.body.tag,
        category: req.body.category,
        valuePerShare: req.body.valuePerShare,
        totalShareAmount: req.body.totalShareAmount,
        totalValue: totalValue,
        owner: req.user._id,
      });
      const property = await newProperty.save();
      res.send({ message: "Property Created", property });
    }
  })
);

propertyRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    const totalValue =
      parseFloat(req.body.valuePerShare) *
      parseFloat(req.body.totalShareAmount);
    if (property) {
      property.valuePerShare = req.body.valuePerShare;
      property.totalShareAmount = req.body.totalShareAmount;
      property.totalValue = totalValue;
      await property.save();
      res.send({ message: "Property Updated" });
    } else {
      res.status(404).send({ message: "Property Not Found" });
    }
  })
);

propertyRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (property) {
      await property.deleteOne({ _id: property._id });
      res.send({ message: "Property Deleted" });
    } else {
      res.status(404).send({ message: "Property Not Found" });
    }
  })
);

export default propertyRouter;
