import React from "react";
import Nav from "../Nav";
import NameDays from "./NameDays/NameDays";
import GridDays from "./GridDays/GridDays";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
  }

  handleArrowClick(direction) {
    if (direction === "right") {
      let month = new Date(this.props.year, this.props.month + 1).getMonth();
      let year = new Date(this.props.year, this.props.month + 1).getFullYear();
      this.props.onChangeDate(month, year);
    } else {
      let month = new Date(this.props.year, this.props.month - 1).getMonth();
      let year = new Date(this.props.year, this.props.month - 1).getFullYear();
      this.props.onChangeDate(month, year);
    }
  }

  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={this.props.month}
          year={this.props.year}
          onArrowClick={this.handleArrowClick}
          onTitleClick={this.props.onTitleClick}
        />
        <NameDays />
        <GridDays
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
        />
      </div>
    );
  }
}
