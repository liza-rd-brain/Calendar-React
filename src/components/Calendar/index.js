import React from "react";
import Nav from "./Nav/Nav";
import NameDays from "./NameDays/NameDays";
import GridDays from "./GridDays/GridDays";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    /*  this.state = {
      today: this.props.today,
      month: this.props.month,
      year: this.props.year
    }; */
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(direction) {
    if (direction === "right") {
      let month = new Date(this.props.year, this.props.month + 1).getMonth();
      let year = new Date(this.props.year, this.props.month + 1).getFullYear();
      this.props.onchangeDate(month, year);
    } else {
      let month = new Date(this.props.year, this.props.month - 1).getMonth();
      let year = new Date(this.props.year, this.props.month - 1).getFullYear();
      this.props.onchangeDate(month, year);
    }
  }

  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={this.props.month}
          year={this.props.year}
          onClick={this.handleClick}
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
