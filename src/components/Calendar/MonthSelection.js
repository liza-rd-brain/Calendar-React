import React, { Component } from "react";
import Nav from "./Nav/Nav";
import GridMonths from "./GridMonth/GridMonth";

class MonthSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(direction) {
    if (direction === "right") {
      this.setState({
        month: new Date(this.state.year + 1, this.state.month + 1).getMonth(),
        year: new Date(this.state.year + 1, this.state.month + 1).getFullYear()
      });
    } else {
      this.setState({
        month: new Date(this.state.year - 1, this.state.month).getMonth(),
        year: new Date(this.state.year - 1, this.state.month).getFullYear()
      });
    }
  }
  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={false}
          year={this.state.year}
          onClick={this.handleClick}
        />
        <GridMonths
          className="gridMonths "
          today={this.state.today}
          month={this.state.month}
          year={this.state.year}
        />
      </div>
    );
  }
}

export default MonthSelection;
