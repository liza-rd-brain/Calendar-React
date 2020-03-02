import React from "react";
import Task from "../Task/Task";
class List extends React.Component {
  render() {
    const taskList = this.props.taskList.map(item => {
      return (
        <Task
          key={item.name + item.id}
          name={item.name}
          desc={item.desc}
          onTaskClick={this.props.onTaskClick}
          task={item}
        />
      );
    });
    return <div className="list">{taskList}</div>;
  }
}

export default List;
