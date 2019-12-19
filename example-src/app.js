import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

/* import Main from "./testComponents/Main"; */
import Block_1 from "./testComponents/Block_1";
import Block_2 from "./testComponents/Block_2";
import Block_3 from "./testComponents/Block_3";
import Constant_Block from "./testComponents/Constant_Block";
import "./style.css";

class App extends React.Component {
  constructor(/* props */) {
    super(/* props */);
    this.handleToBlock_1 = this.handleToBlock_1.bind(this);
    this.handleToBlock_2 = this.handleToBlock_2.bind(this);
    this.handleToBlock_3 = this.handleToBlock_3.bind(this);
  }
  handleToBlock_1() {
    this.props.history.push("/");
    /* console.log(this.props.history); */
  }
  handleToBlock_2() {
    this.props.history.push("/Block_2");
    /* console.log(this.props); */
  }
  handleToBlock_3() {
    this.props.history.push("/Block_3");
    console.log(this.props.history);
  }
  render() {
    return (
      <div className="main">
        App
        <Route exact path="/">
          <Block_1 title="Block_1" clickBlock_1={this.handleToBlock_2} />
        </Route>
        <Route exact path="/Block_2">
          <Block_2
            secondTitle="Block_2"
            clickBlock_2={this.handleToBlock_3}
            clickBlock_Home={this.handleToBlock_1}
          />
        </Route>
        <Route exact path="/Block_3">
          <Block_3 thirdTitle="Block_3" clickBlock_3={this.handleToBlock_2} />
        </Route>
        <Constant_Block constantTitle="Constant_Block"/>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  document.querySelector("#root")
);
