import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import userAuth from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO, { dbName: "EstateAPI" })
  .then(() => console.log("DB connect"))
  .catch((err) => console.log(err));

const app = express();

//it will return json object inside body without it we wont be able to use req.body
app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
  console.log("Server is runnig");
});

app.use("/api/user", userRouter);

app.use("/api/auth", userAuth);

app.use("/api/listing", listingRouter);

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
