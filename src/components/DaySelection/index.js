import React from "react";
import Nav from "../Nav";
import NameDays from "./NameDays/NameDays";
import GridDays from "./GridDays/GridDays";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    /*    this.handleItemClick = this.handleItemClick.bind(this); */
  }
  /*  handleItemClick() {} */

  handleArrowClick(direction) {
    if (direction === "right") {
      let month = new Date(this.props.year, this.props.month + 1).getMonth();
      let year = new Date(this.props.year, this.props.month + 1).getFullYear();
      this.props.onChangeMonth(month);
      this.props.onChangeYear(year);
    } else {
      let month = new Date(this.props.year, this.props.month - 1).getMonth();
      let year = new Date(this.props.year, this.props.month - 1).getFullYear();
      this.props.onChangeMonth(month);
      this.props.onChangeYear(year);
    }
  }

  render() {
    return (
      <div className="daySelection calendar">
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
          onItemClick={this.props.onChangeSelectDate}
        />
      </div>
    );
  }
}
