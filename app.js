require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

 
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
 
const MONGODB_URI = process.env.MONGODB_URI;
 
const app = express();

app.use(bodyParser.json());
 
app.use(express.static(path.join(__dirname, "/client/build")));
 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRoutes);
app.use(userRoutes);
app.use(questionRoutes);
 
app.use(function (error, req, res, next) {
 
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = "Server error.";
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    error.statusCode = 400;
    error.message = "Max size for file must be at most 2mb.";
  }
  const status = error.statusCode;
  const message = error.message;

  res.status(status).json({ message: message, data: error.data });
});

app.use(function (req, res, next) {
  res.status(404).json({ message: "Not found." });
});app.get("*", (req, res) => {
   
  res.sendFile(path.join(__dirname, "/client/build",'index.html'));
});
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
