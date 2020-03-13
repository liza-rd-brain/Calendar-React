import React, { Component } from "react";
import Nav from "../../Nav/index";
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
      this.props.onChangeMonth(month);
      this.props.onChangeYear(year);
      this.props.onChangeStartYear(year);
    } else {
      let month = new Date(this.props.year - 1, this.props.month).getMonth();
      let year = new Date(this.props.year - 1, this.props.month).getFullYear();
      this.props.onChangeMonth(month);
      this.props.onChangeYear(year);
      this.props.onChangeStartYear(year);
    }
  }

  handleClickMonth() {
    /*   ; */
    this.props.onItemClick();
    /* this.props.onChangeRoute(); */
  }

  render() {
    return (
      <>
        <GridMonths
          className="gridMonths "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          onItemClick={this.props.onItemClick}
        />
      </>
      /*  </div> */
    );
  }
}

export default MonthSelection;
