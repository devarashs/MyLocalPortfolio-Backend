import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    isContentVerified: { type: Boolean, default: false },
    name: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    image: { type: String, required: true },
    class: { type: String, required: true },
    category: { type: String, required: true },
    value: { type: Number, required: true },
    usageCost: { type: Number, required: true },
    rareity: { type: String, required: true },
    description: { type: String, required: true },
    guild: { type: String, required: true },
    skills: { type: String, required: true },
    raiting: { type: Number, default: 0 },
    role: { type: String, required: true },
    soul: { type: Boolean, required: true },
    sentient: { type: Boolean, required: true },
    hiddenMessage: { type: String, required: true },
    magic: { type: Number, required: true },
    mana: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    kindness: { type: Number, required: true },
    merciness: { type: Number, required: true },
    weaponCombatLevel: { type: Number, required: true },
    magicCombatLevel: { type: Number, required: true },
    strategicCombatLevel: { type: Number, required: true },
    sacrificeLevel: { type: Number, required: true },
    confidenceLevel: { type: Number, required: true },
    frameType: { type: Number, required: true },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
