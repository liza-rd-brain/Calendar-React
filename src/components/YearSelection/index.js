import React from "react";
import Nav from "../Nav/Nav";
import GridYears from "./GridYears/GridYears";

export default class YearSelection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={false}
          year={this.props.year}
          /*  onClick={this.handleClickNav} */
        />

        <GridYears
          className="gridYears "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          startYear={this.props.startYear}
        />
        {/* </Link> */}
      </div>
    );
  }
}
