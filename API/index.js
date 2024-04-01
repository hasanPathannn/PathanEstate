import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("DB connect"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server is runnig");
});

app.get("/", (req, res) => {
  res.send("Server is created");
});
