import React from "react";
import Nav from "../Nav";
import NameDays from "./NameDays/NameDays";
import GridDays from "./GridDays/GridDays";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    /*    this.handleItemClick = this.handleItemClick.bind(this); */
  }
  /*  handleItemClick() {} */

  handleArrowClick(direction) {
    if (direction === "right") {
      debugger;
      let date = new Date(this.props.year, this.props.month + 1);
      /* let year = new Date(this.props.year, this.props.month + 1).getFullYear(); */
      this.props.onChangeMonth(date.getMonth());
      this.props.onChangeYear(date.getFullYear());
      this.props.onChangeStartYear(date.getFullYear());
    } else {
      let date = new Date(this.props.year, this.props.month - 1);
      /*    let year = new Date(this.props.year, this.props.month - 1).getFullYear(); */
      this.props.onChangeMonth(date.getMonth());
      this.props.onChangeYear(date.getFullYear());
      this.props.onChangeStartYear(date.getFullYear());
    }
  }

  render() {
    return (
      <div className="daySelection calendar">
        <Nav
          className="nav"
          today={this.props.today}
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
          onItemClick={this.props.onChangeSelectDay}
        />
      </div>
    );
  }
}

export default Calendar;
