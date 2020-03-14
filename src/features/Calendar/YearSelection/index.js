import React from "react";
import Nav from "../../Nav/index";
import GridYears from "./GridYears/GridYears";

export default class YearSelection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    /*  let yearsString = `${this.props.startYear}-${this.props.startYear + 15}`; */
    return (
      <>
        <GridYears
          className="gridYears "
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          startYear={this.props.startYear}
          onItemClick={this.props.onItemClick}
        />
      </>
    );
  }
}
