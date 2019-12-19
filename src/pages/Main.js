import React from "react";

import Calendar from "../components/Calendar";
import TaskList from "../components/TaskList/TaskList";

export default class Main extends React.Component {
  render() {
    return (
      <>
        <Calendar
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          onChangeSelectDay={this.props.onChangeSelectDay}
          onChangeMonth={this.props.onChangeMonth}
          onChangeYear={this.props.onChangeYear}
          onChangeDate={this.props.onChangeDate}
          onChangeStartYear={this.props.onChangeStartYear}
          onIncStartYear={this.props.onIncStartYear}
          onDecStartYear={this.props.onDecStartYear}
          startYear={this.props.startYear}
          endYear={this.endYear}
        />
        <TaskList
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          selectDay={this.props.selectDay}
          onClickNewTask={this.props.onClickNewTask}
        />
      </>
    );
  }
}
