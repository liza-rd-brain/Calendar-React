import React, { Component } from "react";
import Nav from "../Nav";
import GridMonths from "./GridMonth/GridMonth";

class MonthSelection extends Component {
  constructor(props) {
    super(props);

    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleClickMonth = this.handleClickMonth.bind(this);
  }

  handleArrowClick(direction) {
    if (direction === "right") {
      let month = new Date(this.props.year + 1, this.props.month).getMonth();
      let year = new Date(this.props.year + 1, this.props.month).getFullYear();
      this.props.onChangeDate(month, year);
    } else {
      let month = new Date(this.props.year - 1, this.props.month).getMonth();
      let year = new Date(this.props.year - 1, this.props.month).getFullYear();
      this.props.onChangeDate(month, year);
    }
  }

  handleClickMonth(month) {
    this.props.onChangeDate(month, this.props.year);
    this.props.onChangeRoute();
  }
  
  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={false}
          year={this.props.year}
          onArrowClick={this.handleArrowClick}
          onTitleClick={this.props.onTitleClick}
        />

        <GridMonths
          className="gridMonths "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          onItemClick={this.handleClickMonth}
        />
      </div>
    );
  }
}

export default MonthSelection;
