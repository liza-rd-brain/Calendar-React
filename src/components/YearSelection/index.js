import React from "react";
import Nav from "../Nav";
import GridYears from "./GridYears/GridYears";

export default class YearSelection extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickNav = this.handleClickNav.bind(this);
    this.handleClickYear = this.handleClickYear.bind(this);
  }
  handleClickNav(direction) {
    if (direction === "right") {
      let month = new Date(this.props.year, this.props.month).getMonth();
      let year = new Date(this.props.year, this.props.month).getFullYear();
      let startYear = new Date(
        this.props.startYear + 16,
        this.props.month
      ).getFullYear();
      /*  debugger; */
      this.props.onchangeDate(month, year, startYear);
    } else {
      let month = new Date(this.props.startYear, this.props.month).getMonth();
      let year = new Date(this.props.year, this.props.month).getFullYear();
      let startYear = new Date(
        this.props.startYear - 16,
        this.props.month
      ).getFullYear();
      this.props.onchangeDate(month, year, startYear);
    }
  }

  handleClickYear(year) {
    /*    debugger; */
    this.props.onchangeDate(this.props.month, year, this.props.startYear);
  }

  render() {
  /*   debugger; */
    let yearsString = `${this.props.startYear}-${this.props.startYear + 15}`;
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={false}
          year={yearsString}
          onClick={this.handleClickNav}
        />

        <GridYears
          className="gridYears "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          startYear={this.props.startYear}
          onClick={this.handleClickYear}
        />
        {/* </Link> */}
      </div>
    );
  }
}
