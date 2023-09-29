import express from "express";
import expressAsyncHandler from "express-async-handler";
import Card from "../models/cardModel.js";
import { isAuth } from "../utils.js";

const cardRouter = express.Router();

cardRouter.get("/", async (req, res) => {
  const cards = await Card.find();
  res.send(cards);
});

cardRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const card = await cardRouter.find({ owner: req.user._id });
    res.send(card);
  })
);

cardRouter.get(
  "/mine/:slug",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const card = await Card.find({
      owner: req.user._id,
      category: req.params.slug,
    });

    res.send(card);
  })
);

cardRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const cardExists = await Card.findOne({
      owner: req.user._id,
      name: req.params.name,
    });

    if (cardExists) {
      res.status(400).send({
        message: "Card with this Name already exists!",
      });
    } else {
      const newCard = new Card({
        name: req.body.name,
        level: req.body.level,
        image: req.body.image,
        class: req.body.class,
        category: req.body.category,
        value: req.body.value,
        usageCost: req.body.usageCost,
        rareity: req.body.rareity,
        description: req.body.description,
        guild: req.body.guild,
        skills: req.body.skills,
        role: req.body.role,
        soul: req.body.soul,
        sentient: req.body.sentient,
        hiddenMessage: req.body.hiddenMessage,
        magic: req.body.magic,
        mana: req.body.mana,
        intelligence: req.body.intelligence,
        kindness: req.body.kindness,
        merciness: req.body.merciness,
        weaponCombatLevel: req.body.weaponCombatLevel,
        magicCombatLevel: req.body.magicCombatLevel,
        strategicCombatLevel: req.body.strategicCombatLevel,
        sacrificeLevel: req.body.sacrificeLevel,
        confidenceLevel: req.body.confidenceLevel,
        creator: req.user._id,
        owner: req.user._id,
      });
      const card = await newCard.save();
      res.send({ message: "Card Created", card });
    }
  })
);

cardRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id);
    if (card.creator !== req.user._id) {
      res.status(400).send({
        message: "Your Not The Owner Of This Card!",
      });
    } else if (card) {
      card.name = req.body.name;
      card.level = req.body.level;
      card.image = req.body.image;
      card.class = req.body.class;
      card.category = req.body.category;
      card.value = req.body.value;
      card.usageCost = req.body.usageCost;
      card.rareity = req.body.rareity;
      card.description = req.body.description;
      card.guild = req.body.guild;
      card.skills = req.body.skills;
      card.raiting = req.body.raiting;
      card.role = req.body.role;
      card.soul = req.body.soul;
      card.sentient = req.body.sentient;
      card.hiddenMessage = req.body.hiddenMessage;
      card.magic = req.body.magic;
      card.mana = req.body.mana;
      card.intelligence = req.body.intelligence;
      card.kindness = req.body.kindness;
      card.merciness = req.body.merciness;
      card.weaponCombatLevel = req.body.weaponCombatLevel;
      card.magicCombatLevel = req.body.magicCombatLevel;
      card.strategicCombatLevel = req.body.strategicCombatLevel;
      card.sacrificeLevel = req.body.sacrificeLevel;
      card.confidenceLevel = req.body.confidenceLevel;
      card.creator = req.user._id;
      card.owner = req.user._id;
      await card.save();
      res.send({ message: "Card Updated" });
    } else {
      res.status(404).send({ message: "Card Not Found" });
    }
  })
);

cardRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id);
    if (card.creator !== req.user._id) {
      res.status(400).send({
        message: "Your Not The Owner Of This Card!",
      });
    } else if (card) {
      await card.deleteOne({ _id: card._id });
      res.send({ message: "Card Deleted" });
    } else {
      res.status(404).send({ message: "Card Not Found" });
    }
  })
);

export default cardRouter;
