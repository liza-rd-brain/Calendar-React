import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./components/Calendar/Calendar";
import "./style.css";

class App extends React.Component {
  render() {
    return <Calendar />;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
