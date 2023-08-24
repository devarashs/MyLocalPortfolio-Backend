import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import corsMiddleware from "./cors.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(corsMiddleware);

app.get("/check", (req, res) => {
  res.send("ok");
});

app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
