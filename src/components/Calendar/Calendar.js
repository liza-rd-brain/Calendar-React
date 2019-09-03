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
  }

  handleClick(data) {
    if (data === "right") {
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
          onClick={data => this.handleClick(data)}
        />
        <NameDays />
        <GridDays month={this.state.month} />
      </div>
    );
    console.log("нарисовался новый месяц!");
  }
}
