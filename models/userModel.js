import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferredCurrency: { type: String, default: "USD", required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isCreator: { type: Boolean, default: false, required: true },
    abyssBalance: { type: String, default: 1024, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
