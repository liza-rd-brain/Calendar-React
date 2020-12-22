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
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const responceTest = JSON.stringify({ test: "test" });

app.get("/", (req, res) => {
  res.send(JSON.stringify(data));
});

app.get("/newTask", (req, res) => {
  res.send(JSON.stringify(data));
});
app.get("/tasks", (req, res) => {
  res.send(JSON.stringify(data));
});

//newTask_?!
app.post("/newTask", (req, res) => {
  /*  responce = req.body; */
  data.tasks.push(req.body);
  res.send(JSON.stringify(data));
});

app.put("/", (req, res) => {
  //мутация
  data.tasks = changeData(req.body);
  res.send(JSON.stringify(data));
});

app.delete("/", (req, res) => {
  //мутация
  data.tasks = deleteData(req.body);
  res.send(JSON.stringify(data));
});

changeData = (task) => {
  return data.tasks.map((item, i) => {
    if (item.id === task.id) {
      return task;
    } else {
      return item;
    }
  });
};

deleteData = (task) => {
  return data.tasks.filter((item, index) => {
    return item.id != task.id;
  });
};

app.listen(3000, () => {
  console.log("server has been started");
});
