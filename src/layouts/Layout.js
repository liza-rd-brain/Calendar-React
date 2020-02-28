import React from "react";
import Timer from "../components/Timer";
import TaskList from "../components/TaskList/TaskList";
class Layout extends React.Component {
  render() {
    return (
      <>
        <Timer today={this.props.today} time={this.props.time} />
        {this.props.children}
        <TaskList
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          selectDay={this.props.selectDay}
          hrefNewTask={this.props.hrefNewTask}
          taskList={this.props.taskList}
        />
      </>
    );
  }
}

export default Layout;
