import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Calendar from "./components/Calendar/Calendar";

class App extends React.Component {
  render() {
    // return <>Apps</>
    return <Calendar/>;
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
