import React from "react";
import Nav from "./Nav/Nav";
import NameDays from "./NameDays/NameDays";
import GridDays from "./GridDays/GridDays";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    this.updateSystemDate = this.updateSystemDate.bind(this);
    this.update = setInterval(this.updateSystemDate, 1000);
  }

  updateSystemDate() {
    const numberDayTomorrow = new Date().getDate();
    const numberDayToday = this.state.today.getDate();
    if (numberDayTomorrow !== numberDayToday) {
      this.setState({ today: new Date() });
    }
  }

  handleClick(direction) {
    if (direction === "right") {
      this.setState({
        month: new Date(this.state.year, this.state.month + 1).getMonth(),
        year: new Date(this.state.year, this.state.month + 1).getFullYear()
      });
    } else {
      this.setState({
        month: new Date(this.state.year, this.state.month - 1).getMonth(),
        year: new Date(this.state.year, this.state.month - 1).getFullYear()
      });
    }
  }

  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          month={this.state.month}
          year={this.state.year}
          onClick={this.handleClick}
        />
        <NameDays />
        <GridDays
          today={this.state.today}
          month={this.state.month}
          year={this.state.year}
        />
      </div>
    );
  }
}