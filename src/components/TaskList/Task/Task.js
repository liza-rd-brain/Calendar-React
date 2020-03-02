import React from "react";
import { Link } from "react-router-dom";

/*ссылка ведущая в окно newTask c пропсами, которые берет из steate
адрес динамический?! :id...*/

class Task extends React.Component {
  render() {
    return (
      <div>
        <Link className="link" to={`/tasks/${this.props.name}`}>
          {this.props.name}
        </Link>
        {/* <p onClick={this.props.onTaskClick}>{this.props.name}</p> */}
      </div>
    );
  }
}

export default Task;
