import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import Layout from "./Layout";
import MonthSelection from "./components/Calendar/MonthSelection";
import Main from "./Main";

import "./style.css";

ReactDOM.render(
  <Router>
    <Layout>
      <Route exact path="/" component={Main} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/test" component={MonthSelection} />
    </Layout>
  </Router>,
  document.querySelector("#root")
);
