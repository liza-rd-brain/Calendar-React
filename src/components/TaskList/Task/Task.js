import React from "react";

class Task extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default Task;
