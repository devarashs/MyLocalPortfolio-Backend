import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    label: { type: String, required: true },
    category: { type: String, required: true },
    value: { type: Number, required: true },
    rareity: { type: String, required: true },
    description: { type: String, required: true },
    guild: { type: String, required: true },
    stars: { type: Number, required: true },
    skills: { type: Array, required: true },

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
