import React from "react";

/*ссылка ведущая в окно newTask c пропсами, которые берет из steate
адрес динамический?! :id...*/ 
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
