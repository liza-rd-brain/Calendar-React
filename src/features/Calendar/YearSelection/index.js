import React from "react";
import Nav from "../../Nav/index";
import GridYears from "./GridYears/GridYears";

export default class YearSelection extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleClickYear = this.handleClickYear.bind(this);
  }
  handleArrowClick(direction) {
    if (direction === "right") {
      this.props.onIncStartYear();
    } else {
      /*    ; */
      this.props.onDecStartYear();
    }
  }

  handleClickYear(year) {
    this.props.onChangeYear(year);
    /* this.props.onChangeDate(this.props.month, year, this.props.startYear); */
    this.props.onChangeRoute();
  }

  render() {
    let yearsString = `${this.props.startYear}-${this.props.startYear + 15}`;
    return (
      <>
        <GridYears
          className="gridYears "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          startYear={this.props.startYear}
          onItemClick={this.onItemClick}
        />
      </>
    );
  }
}
