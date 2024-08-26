import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Compilers are working!");
});

app.listen(5678, () => {
  console.log("Server is running on port 5678");
});
