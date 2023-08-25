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

propertyRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newProperty = new Property({
      tag: req.body.tag,
      category: req.body.category,
      valuePerShare: req.body.valuePerShare,
      totalShareAmount: req.body.totalShareAmount,
      owner: req.user._id,
    });
    const property = await newProperty.save();
    res.send({ message: "Property Created", property });
  })
);

propertyRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (property) {
      tag = req.body.tag;
      category = req.body.category;
      valuePerShare = req.body.valuePerShare;
      totalShareAmount = req.body.totalShareAmount;
      await property.save();
      res.send({ message: "Property Updated" });
    } else {
      res.status(404).send({ message: "Property Not Found" });
    }
  })
);

export default propertyRouter;
