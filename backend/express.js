const express = require("express");
/* const list = require("./data"); */

const app = express();

const data = {
  tasks: [
    {
      id: 1,
      name: "12:00",
      startDate: "2020-12-17",
      startTime: "12:00",
      endDate: "2020-12-18",
      endTime: "",
      desc: "12:00",
    },

    {
      id: 2,
      name: "14:00",
      startDate: "2020-12-16",
      startTime: "14:00",
      endDate: "2020-12-20",
      endTime: "",
    },

    {
      id: 3,
      name: "09:00",
      startDate: "2020-12-21",
      startTime: "09:00",
      endDate: "2020-12-22",
      endTime: "",
    },
  ],
};

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const responceTest = JSON.stringify({ test: "test" });

app.get("/", (req, res) => {
  /*   console.log(list); */
  res.send(JSON.stringify(data));
});

/* app.options("/", (req, res) => {
  console.log(req.body);
  res.send("ok");
}); */
var responce = null;

app.post("/", (req, res) => {
  responce = req.body;
  data.tasks.push(responce);
  res.send(JSON.stringify(data));
});

app.listen(3000, () => {
  console.log("server has been started");
});
