const express = require("express");
const list = require("./data");

const app = express();
const moment = require("moment");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  /* res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With"); */
  next();
});

const responceTest = JSON.stringify({ test: "test" });

app.get("/", (req, res) => {
  console.log(list);
  res.send(list);
});

app.listen(3000, () => {
  console.log("server has been started");
});

console.log(list);
