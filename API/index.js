import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("Server is runnig");
});

app.get("/", (req, res) => {
  res.send("Server is created");
});
