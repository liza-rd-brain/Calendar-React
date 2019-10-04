import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import GridMonths from "./GridMonth/GridMonth";

class MonthSelection extends Component {
  constructor(props) {
    super(props);
    /*    this.state = {
      today: this.props.today,
      month: this.props.month,
      year: this.props.year
    }; */
    this.handleClickNav = this.handleClickNav.bind(this);
    this.handleClickMonth = this.handleClickMonth.bind(this);
  }
  handleClickNav(direction) {
    if (direction === "right") {
      let month = new Date(this.props.year + 1, this.props.month).getMonth();
      let year = new Date(this.props.year + 1, this.props.month).getFullYear();
      this.props.onchangeDate(month, year);
    } else {
      let month = new Date(this.props.year - 1, this.props.month).getMonth();
      let year = new Date(this.props.year - 1, this.props.month).getFullYear();
      this.props.onchangeDate(month, year);
    }
  }
  handleClickMonth(month) {
    this.props.onchangeDate(month,this.props.year);
  }
  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={false}
          year={this.props.year}
          onClick={this.handleClickNav}
          href={this.props.href}
        />
        {/* <Link className="nameMonth" to="/calendar"> */}
        <GridMonths
          className="gridMonths "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          onClick={this.handleClickMonth}
        />
        {/* </Link> */}
      </div>
    );
  }
}

export default MonthSelection;
