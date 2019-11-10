import React from "react";
import Nav from "../Nav";
import GridYears from "./GridYears/GridYears";

export default class YearSelection extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleClickYear = this.handleClickYear.bind(this);
  }
  handleArrowClick(direction) {
    if (direction === "right") {
      let month = new Date(this.props.year, this.props.month).getMonth();
      let year = new Date(this.props.year, this.props.month).getFullYear();
      let startYear = new Date(
        this.props.startYear + 16,
        this.props.month
      ).getFullYear();
      this.props.onChangeDate(month, year, startYear);
    } else {
      let month = new Date(this.props.startYear, this.props.month).getMonth();
      let year = new Date(this.props.year, this.props.month).getFullYear();
      let startYear = new Date(
        this.props.startYear - 16,
        this.props.month
      ).getFullYear();
      this.props.onChangeDate(month, year, startYear);
    }
  }

  handleClickYear(year) {
    this.props.onChangeDate(this.props.month, year, this.props.startYear);
    this.props.onChangeRoute();
  }

  render() {
    let yearsString = `${this.props.startYear}-${this.props.startYear + 15}`;
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={false}
          year={yearsString}
          onArrowClick={this.handleArrowClick}
        />

        <GridYears
          className="gridYears "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          startYear={this.props.startYear}
          onItemClick={this.handleClickYear}
        />
      </div>
    );
  }
}
