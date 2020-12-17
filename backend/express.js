const express = require("express");
/* const mongoose = require("mongoose"); */
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  /* res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With"); */
  next();
});

const responceTest = JSON.stringify({ test: "test" });

app.get("/", (req, res) => {
  console.log(responceTest);
  res.send(JSON.stringify({ test: "test" }));
});

app.listen(3000, () => {
  console.log("server has been started");
});

/*__________________ MONGO */
/* mongoose.set("useUnifiedTopology",~ true);
const uri =
  "mongodb+srv://test:test@cluster0.8wsef.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MDB success");
}); */
